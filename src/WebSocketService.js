import { io } from "socket.io-client";

const socket = io("http://137.184.220.73:3001", { transports : ['websocket'] })

export default socket;