import { useContext } from "react";
import { SocketContext } from "../context-providers/SocketProvider";

export const useSocket = () => {
	const socket = useContext(SocketContext);

	if (!socket) throw new Error("useSocket must be used within a SocketProvider");

	return socket;
};
