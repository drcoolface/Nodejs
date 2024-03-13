import { Request, Response } from 'express';
import AppDataSource from '../configs/ormconfig';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const UserController = {
    findAll: async (req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    },
    
    findOne: async (req: Request, res: Response) => {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
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
    }
};
