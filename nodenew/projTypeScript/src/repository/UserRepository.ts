import { Request, Response } from 'express';
import AppDataSource from '../configs/ormconfig';
import { User } from '../entity/User';
import { Event } from '../entity/Event';
import { Registration } from '../entity/Registration';
import { EmailService } from '../services/EmailService'; 

import { infoLogger, errorLogger } from '../configs/logger';


const userRepository = AppDataSource.getRepository(User);

export const UserController = {
    findAll: async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    },
    
    findOne: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
    
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ["registrations"]
        });
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(user);
    },
    
    
    create: async (req: Request, res: Response) => {
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(savedUser);
    },
    
    update: async (req: Request, res: Response) => {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });

        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        res.json(results);
    },
    
    delete: async (req: Request, res: Response) => {
        const results = await userRepository.delete(req.params.id);
        res.json({ message: 'User deleted', results });
    },

    addEvent: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newEvent = new Event();
        Object.assign(newEvent, req.body);
        newEvent.organizer = user; 

        const eventRepository = AppDataSource.getRepository(Event);
        const savedEvent = await eventRepository.save(newEvent);

        res.status(201).json(savedEvent);
    },

    registerUserToEvent: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const eventId = parseInt(req.params.eventId);
    
        try {
            const userRepository = AppDataSource.getRepository(User);
            const eventRepository = AppDataSource.getRepository(Event);
            const registrationRepository = AppDataSource.getRepository(Registration);
        
            const user = await userRepository.findOneBy({ id: userId });
            const event = await eventRepository.findOneBy({ id: eventId });
        
            if (!user || !event) {
                return res.status(404).json({ message: 'User or Event not found' });
            }
        
            const isAlreadyRegistered = await registrationRepository.findOne({
                where: { user: { id: userId }, event: { id: eventId } }
            });

            if (isAlreadyRegistered) {
                return res.status(400).json({ message: 'User is already registered for this event.' });
            }

            const registration = new Registration();
            registration.user = user;
            registration.event = event;
        
            await registrationRepository.save(registration);
             await EmailService.sendRegistrationConfirmation(user.email, user.name, event.title); // Adjust "Event Date Here" accordingly

           
            return res.status(201).json({ message: 'User registered to event successfully' });
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error(errorMessage);
        }
    },

    deregisterUserFromEvent : async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const eventId = parseInt(req.params.eventId);
    
        try {
            const registrationRepository = AppDataSource.getRepository(Registration);
    
            // Fetch the registration along with user and event details
            const registration = await registrationRepository.findOne({
                where: {
                    user: { id: userId },
                    event: { id: eventId }
                },
                relations: ['user', 'event'], // Include user and event in the response
            });
    
            if (!registration) {
                return res.status(404).json({ message: 'Registration not found.' });
            }
    
            // Extract the user's name and event's title for logging
            const { user, event } = registration;
            const userName = user.name;
            const eventName = event.title;
    
            // Proceed with deregistration
            await registrationRepository.remove(registration);
            infoLogger.info(`User ${userName} deregistered from event ${eventName} successfully.`);
            
            // Respond with success message including user's name and event's title
            return res.status(200).json({ message: `User ${userName} deregistered from ${eventName} successfully.` });
        } catch (error) {
            let errorMessage = 'An unknown error occurred during deregistration.';
            if (error instanceof Error) {
                errorMessage = error.message;
                errorLogger.error(errorMessage);
            }
            console.error(errorMessage);
            return res.status(500).json({ message: errorMessage });
        }
    }
};
