import { WebSocket } from "ws";
import { GatewayEvent } from "../../payload/GatewayPayload";
import { zlibSend } from "../../utils/zlibSend";

export default function Heartbeat(
  socket: WebSocket,
  payload: GatewayEvent
): void {
  const message: GatewayEvent = {
    op: 1,
    t: "",
    d: {
      op: 11,
      d: {},
    },
  };
  zlibSend(socket, JSON.stringify(message));
}
