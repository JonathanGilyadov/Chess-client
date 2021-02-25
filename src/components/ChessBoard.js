import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { useImmer } from 'use-immer';

const Chess = require('chess.js');

const App = ({ socket, game, username }) => {
	const { id } = game;
	const [chess] = useState(new Chess(game.fen));
	const [messages, setMessages] = useImmer([]);
	const [value, setValue] = useState([]);
	const [fen, setFen] = useState(chess.fen());
	const [turn, setTurn] = useState(game.turn);

	console.log(game);
	const player =
		game.playerOne.username === username ? game.playerOne : game.playerTwo;

	const sendMessage = () => {
		console.log(game);
		socket.emit('message', { value, roomID: id });
	};

	useEffect(() => {
		console.log(messages);
		socket.on('chatMessage', (message) => {
			setMessages((draft) => {
				draft.push([message]);
			});
		});

		// Listen for moves
		socket.on('move', (data) => {
			const { fen, move, turn } = data;

			console.log(turn);
			chess.move(move);

			// Set new fen
			setFen(fen);

			//Set new turn
			setTurn(turn);
		});
	}, []);

	const handleMove = (move) => {
		// Check if it's players turn
		console.log(game.turn);
		console.log(player.color);
		if (turn !== player.color) return;

		// Check if move is legal
		if (chess.move(move)) {
			// Send move to server
			socket.emit('move', { move, id: game.id, fen: chess.fen() });
		} else {
			alert('Move is illegal!');
		}
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
		<div className="flex-center">
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
				orientation={player.color}
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
