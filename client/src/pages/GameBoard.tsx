import { Box, Text } from "@mantine/core";
import { useEffect } from "react";
import { io } from 'socket.io-client';

type Props = {};

function GameBoard({}: Props) {
	useEffect(() => {
		const socket = io('ws://localhost:3000', {
            transports: ['websocket']
        });

    	socket.on('connect', () => {
      		console.log(`Connected to server with ID: ${socket.id}`);

      		socket.emit('message', 'Hello from the client!');
    });

    socket.on('message', (data) => {
      console.log(`Message from server: ${data}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

	return <Box p={32}>
		<Text>This is the gameboard</Text>
	</Box>;
}

export default GameBoard;
