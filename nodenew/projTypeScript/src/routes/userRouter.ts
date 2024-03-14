import { Router } from "express";
import { UserController } from "../repository/UserRepository";

const router = Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.post('/:userId/register/:eventId', UserController.registerUserToEvent);
router.post('/:userId/deregister/:eventId', UserController.deregisterUserFromEvent);

export default router;