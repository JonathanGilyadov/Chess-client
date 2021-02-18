import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { useImmer } from 'use-immer';

const Chess = require('chess.js');

const App = ({ socket, game }) => {
  const { id } = game;
  const [chess] = useState(new Chess(game.fen));
  const [messages, setMessages] = useImmer([]);
  const [value, setValue] = useState([]);
  const [fen, setFen] = useState(chess.fen());

  const sendMessage = () => {
    socket.emit('message', { value, id });
  };

  useEffect(() => {
    console.log(messages);
    socket.on('chatMessage', (message) => {
      setMessages((draft) => {
        draft.push([message]);
      });
    });
  }, []);

  const handleMove = (move) => {
    chess.move(move);
    socket.emit('move', { move, id, fen: chess.fen() });
    console.log(move);
  };

  // const handleMove = (move) => {
  //   if (chess.move(move)) {
  //     setTimeout(() => {
  //       const moves = chess.moves();

  //       if (moves.length > 0) {
  //         const computerMove = moves[Math.floor(Math.random() * moves.length)];
  //         chess.move(computerMove);
  //         setFen(chess.fen());
  //       }
  //     }, 300);

  //     setFen(chess.fen());
  //   }
  // };

  return (
    <div className='flex-center'>
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q',
          })
        }
      />
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={sendMessage}>submit</button>
    </div>
  );
};

export default App;
