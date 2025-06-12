import { createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_APP_SOCKET_URL;

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const socket = socketIOClient(ENDPOINT, { withCredentials: true });

	useEffect(() => {
		socket.on("connect");

		return () => {
			socket.disconnect();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
