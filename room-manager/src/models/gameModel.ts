import { Socket } from 'socket.io';
import  { Chess, ChessInstance } from 'chess.js';

export class Player {
  socket: Socket;
  colour: string;

  constructor(socket: Socket, colour: string) {
    this.socket = socket;
    this.colour = colour;
  }

  static getRandomColor(): string {
    const colors  = ['black', 'white'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
}


export enum Color {
  white = 'white',
  black = 'black'
}

export class Game {
  gameId: string;
  blackPlayer?: Player;
  whitePlayer?: Player;
  started: boolean;
  ended: boolean;
  watching: Socket[];
  chessboard: ChessInstance;
  turn: 'black' | 'white';
  numberOfPlayers: number;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.started = false;
    this.ended = false;
    this.watching = [];
    this.chessboard = new Chess();
    this.turn = 'white'; // You can set the initial turn to 'white' or 'black'
    this.numberOfPlayers = 0;
  }

  setPlayer(player : Player): void {

    if(player.colour == 'black'){
        this.blackPlayer = player;
    }
    else{
        this.whitePlayer = player;
    }
    this.numberOfPlayers = this.numberOfPlayers + 1 ;
  }

  startGame(): void {
    this.started = true;
    // Any other logic to initialize the game can be added here
  }

  endGame(): void {
    this.ended = true;
    // Any other logic to handle game ending can be added here
  }

  // Additional methods for making moves, handling turns, etc. can be added here
}
