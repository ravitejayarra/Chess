import { Router } from 'express';
import roomController from '../controllers/roomController';
import authorizationMiddleware from '../middlewares/authorizationMiddleware';

const router = Router();

// Route to create a new room


router.post('/', authorizationMiddleware, roomController.createGame);

export default router;



