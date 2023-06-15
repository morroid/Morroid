import { WebSocket } from "ws";
import { HeartbeatAckEvent as HeartbeatACKEvent, HeartbeatEvent } from "../../payload/GatewayPayload";
import { zlibSend } from "../../utils/zlibSend";

export default function Heartbeat(
  socket: WebSocket,
  payload: HeartbeatEvent
): void {
  const message: HeartbeatACKEvent = {
    op: 11
  };
  socket.send(JSON.stringify(message));
}
