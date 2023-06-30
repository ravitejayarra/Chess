import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../custom-interfaces/user';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret');

    req.user = decoded as User;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};

export default verifyToken;
