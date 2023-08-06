import { Request, Response, NextFunction } from 'express';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { User } from '../custom-interfaces/user';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token
    // console.log(process.env.CHESS_JWTPRIVATEKEY, " =  private key")
    // const decoded = jwt.verify(token, process.env.CHESS_JWTPRIVATEKEY as Secret | GetPublicKeyOrSecret);

    // req.user = decoded as User;
    // req.user = decoded as any;
    // req.user = jwt.verify(token, process.env.CHESS_JWTPRIVATEKEY as Secret | GetPublicKeyOrSecret) as User | undefined;
    req.user = jwt.verify(token, process.env.CHESS_JWTPRIVATEKEY as Secret | GetPublicKeyOrSecret) as User | undefined;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};

export default verifyToken;
