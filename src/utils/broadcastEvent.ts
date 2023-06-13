import { WebSocketServer } from "ws";
import { GatewayMessage, GatewayPayload } from "../payload/GatewayPayload";

export default function broadcastEvent(
  socket: WebSocketServer,
  payload: GatewayPayload
): void {
  const message: GatewayMessage = {
    t: "",
    d: payload.d,
  };

  socket.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
