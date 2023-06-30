// import express from 'express';
// import cors from 'cors';
// import roomRoutes from './routes/roomRoutes';

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/rooms', roomRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import express, { Request, Response } from 'express';
import roomRoutes from './routes/roomroutes';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the roomRoutes for /room requests
app.use('/room', roomRoutes);

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('This is the home route');
});

const port = 3900;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

