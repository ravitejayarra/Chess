import { Request, Response } from 'express';
import  { Chess, ChessInstance } from 'chess.js';
import { games } from '../socket';
import { Game, Player } from '../models/gameModel';

const createGame = (req: Request, res: Response) => {
  // Logic to create a room and interact with the authentication microservice
  // Extract user information from req.user (provided by the authorization middleware)
  // Generate room ID and perform necessary operations
  // Return the created room details in the response
  console.log(req.user)
  // const room = {
  //   id: '123',
  //   name: 'My Room',
  // };

  const gameCode = generateGameCode();
  const game : Game  = new Game(gameCode)
  games.push(game);


  res.status(201).json(gameCode);
};

function generateGameCode(): string {
  const characters = '0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}


export default {
  createGame,
};
