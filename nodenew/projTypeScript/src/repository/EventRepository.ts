import { Request, Response } from 'express';
import AppDataSource from '../configs/ormconfig';
import { Event } from '../entity/Event';
const eventRepository = AppDataSource.getRepository(Event);

export const EventController = {
    findAll: async (req: Request, res: Response) => {
        // Use find options to load the 'organizer' relation
        const events = await eventRepository.find({ relations: ["organizer"] });
        
        // Optionally, map over events to customize the response format
        const response = events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            thumbnail: event.thumbnail,
            seats: event.seats,
            price: event.price,
            date: event.date,
            organizerName: event.organizer?.name // Safely access the name with optional chaining
        }));
    
        res.json(response);
    },
    
    findOne: async (req: Request, res: Response) => {
        const eventId = parseInt(req.params.id);
        // Use findOne options to load the 'organizer' relation
        const event = await eventRepository.findOne({
            where: { id: eventId },
            relations: ["organizer"]
        });        

        const response = {
            id: event?.id,
            title: event?.title,
            description: event?.description,
            thumbnail: event?.thumbnail,
            seats: event?.seats,
            price: event?.price,
            date: event?.date,
            organizerName: event?.organizer?.name // Safely access the name with optional chaining
        };


        if (!event) return res.status(404).json({ message: 'Event not found' });

        
        res.json(response);
    },
    
    create: async (req: Request, res: Response) => {
        const newEvent = eventRepository.create(req.body);
        const savedEvent = await eventRepository.save(newEvent);
        res.status(201).json(savedEvent);
    },
    
    update: async (req: Request, res: Response) => {
        const event = await eventRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!event) return res.status(404).json({ message: 'Event not found' });

        eventRepository.merge(event, req.body);
        const results = await eventRepository.save(event);
        res.json(results);
    },
    
    delete: async (req: Request, res: Response) => {
        const results = await eventRepository.delete(req.params.id);
        res.json({ message: 'Event deleted', results });
    }
};
