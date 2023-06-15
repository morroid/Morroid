import { WebSocket } from "ws";
import { GatewayEvent } from "../../payload/GatewayPayload";

export default function Heartbeat(socket: WebSocket, payload: GatewayEvent): void {
  const message: GatewayEvent = {
    op: 1,
    t: "",
    d: {
      op: 11,
      d: {},
    },
  };
  socket.send(JSON.stringify(message));
}
