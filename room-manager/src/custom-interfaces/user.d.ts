// import { Types } from 'mongoose';
// import { Request } from 'express';
// import { JwtPayload } from 'jsonwebtoken'

// declare module 'express' {
//   interface Request {
//     user: {
//       userid: string | JwtPayload;
//     };
//   }
// }


import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User; // Replace 'User' with the name of your user interface or type
  }
}

interface User {
  _id: string;
  iat: number;
}
