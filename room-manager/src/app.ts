import express from 'express';
import cors from 'cors';
import roomRoutes from './routes/roomroutes';
import dotenv from "dotenv";
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configureSocket } from './socket';

dotenv.config({
  encoding: "utf8",
  path: path.resolve(process.cwd(), ".env"),
});

const app = express();

const server = createServer(app);
const io = new Server(server);



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/startGame', roomRoutes);

configureSocket(io);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



