import { WebSocket } from "ws";
import {
  HeartbeatAckEvent,
  HeartbeatEvent,
} from "../../payload/GatewayPayload";
import { zlibSend } from "../../utils/zlibSend";

export default function Heartbeat(socket: WebSocket, payload: HeartbeatEvent): void {

  const message: HeartbeatAckEvent = {
    op: 11,
  };

  zlibSend(socket, JSON.stringify(message));
}
