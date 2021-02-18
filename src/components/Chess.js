import React, { Fragment, useEffect, useState } from 'react';
import App from './ChessBoard';

const Chess = (props) => {
	const [statusSearch, setStatusSearch] = useState(false);
	const [game, setGame] = useState(false);

	useEffect(() => {
		const socket = props.socket;

		socket.emit('lookingToPlay', { username: props.username });

		socket.on('statusSearch', ({ status, game, message }) => {
			console.log(status, message, game);
			setStatusSearch(status);
			if (game) setGame(game);
		});
	}, []);

	if (!statusSearch) return <h1>Loading...</h1>;
	if (statusSearch === 'LOOKING_FOR_GAME') return <h1>Matching you up...</h1>;
	if (statusSearch === 'FOUND_GAME')
		return <App socket={props.socket} game={game} />;
};

export default Chess;
