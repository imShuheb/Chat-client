
import socketIOClient from "socket.io-client";

const SERVER_URL = "ws://localhost:8000/chat"; 

class WebSocketService {
  constructor() {
    this.socket = socketIOClient(SERVER_URL, { transports: ["websocket"] });
  }

  createChatRoom = (chatRoomData) => {
    this.socket.emit("createChatRoom", chatRoomData);
  }

  // Add other methods as needed
}

export default new WebSocketService();
