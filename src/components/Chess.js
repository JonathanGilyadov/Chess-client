import React, { Fragment, useEffect, useState } from 'react';
import App from './ChessBoard';

const Chess = ({ username, socket }) => {
	const [statusSearch, setStatusSearch] = useState(false);
	const [game, setGame] = useState(null);

	useEffect(() => {
		socket.emit('lookingToPlay', { username });

		socket.on('statusSearch', ({ status, game, message }) => {
			console.log(status, message, game);
			setStatusSearch(status);
			if (game) setGame(game);
		});
	}, []);

	if (!statusSearch) return <h1>Loading...</h1>;
	if (statusSearch === 'LOOKING_FOR_GAME') return <h1>Matching you up...</h1>;
	if (statusSearch === 'FOUND_GAME' && !game) return <h1>Loading game</h1>;
	if (statusSearch === 'FOUND_GAME' && game)
		return <App {...{ socket, game, username }} />;
};

export default Chess;
