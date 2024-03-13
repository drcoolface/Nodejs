import { Router } from "express";
import { EventController } from "../repository/EventRepository";


const router = Router();

router.get('/', EventController.findAll);
router.get('/:id', EventController.findOne);
router.post('/', EventController.create);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

export default router;