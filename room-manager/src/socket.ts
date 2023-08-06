import { Server, Socket } from 'socket.io';
import  { ChessInstance } from 'chess.js';
import { Game , Player, Color } from './models/gameModel';

// interface Game {
//   code: string;
//   chess: ChessInstance;
//   started: boolean;
//   ended: boolean;
// }

export const games: Game[] = [];



export function configureSocket(io: Server) {

  const gameRoomSocket  = io.of("/Game")
  gameRoomSocket.on('connection', (socket: Socket) => {
    let gameCode: string | null = null;

    socket.on('joinGame',(code: string) => {
      const game = games.find((g) => g.gameId === code);
      if (game && !game.started) {
        socket.join(code);
        gameCode = code;
        gameRoomSocket.to(code).emit('playerJoined', gameCode);

        if(game.numberOfPlayers == 0){ 
          const player : Player = new Player(socket, Player.getRandomColor())
          game.setPlayer(player)
        }
        else{
          if(!game.whitePlayer){
            const player : Player = new Player(socket, Color.white)
            game.setPlayer(player)
          }
          else{
            const player : Player = new Player(socket, Color.black)
            game.setPlayer(player)
          }
        }
        
      } else {
        socket.emit('invalidGameCode');
      }
    });

    socket.on('makeMove', (move: string) => {
      if (gameCode) {
        const game = games.find((g) => g.gameId === gameCode);
        if (game && !game.ended) {
          const validMove = game.chessboard.move(move, { sloppy: true });
          if (validMove) {
            gameRoomSocket.to(gameCode).emit('moveMade', move);
            const isCheckmate = game.chessboard.in_checkmate();
            const isDraw = game.chessboard.in_draw();
            if (isCheckmate || isDraw) {
              game.ended = true;
              gameRoomSocket.to(gameCode).emit('gameEnded', { isCheckmate, isDraw });
            }
          } else {
            socket.emit('invalidMove');
          }
        } else {
          socket.emit('gameEnded');
        }
      }
    });
  });
}
