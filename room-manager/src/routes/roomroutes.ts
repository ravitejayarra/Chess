// import { Router } from 'express';
// import roomController from '../controllers/roomController';
// import authorizationMiddleware from '../middlewares/authorizationMiddleware';

// const router = Router();

// // Route to create a new room
// router.post('/', authorizationMiddleware, roomController.createRoom);

// export default router;


import { Router, Request, Response } from 'express';

const router: Router = Router();

// GET /room
router.get('/', (req: Request, res: Response) => {
  res.send('This is the /room route');
});

// POST /room
router.post('/', (req: Request, res: Response) => {
  // Handle room creation logic
  res.send('Room created successfully');
});

export default router;
