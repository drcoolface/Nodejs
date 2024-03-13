import { Request, Response } from 'express';
import AppDataSource from '../configs/ormconfig';
import { Event } from '../entity/Event';
const eventRepository = AppDataSource.getRepository(Event);

export const EventController = {
    findAll: async (req: Request, res: Response) => {
        const events = await eventRepository.find();
        res.json(events);
    },
    
    findOne: async (req: Request, res: Response) => {
        const event = await eventRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
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
