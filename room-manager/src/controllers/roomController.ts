import { Request, Response } from 'express';

const createRoom = (req: Request, res: Response) => {
  // Logic to create a room and interact with the authentication microservice
  // Extract user information from req.user (provided by the authorization middleware)
  // Generate room ID and perform necessary operations
  // Return the created room details in the response
  console.log(req.user)
  const room = {
    id: '123',
    name: 'My Room',
  };

  res.status(201).json(room);
};

export default {
  createRoom,
};
