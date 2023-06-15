import { WebSocket } from "ws";
import {
  HeartbeatAckEvent as HeartbeatACKEvent,
  HeartbeatEvent,
} from "../../payload/GatewayPayload";
import { zlibSend } from "../../utils/zlibSend";

export default function Heartbeat(socket: WebSocket): void {
  const message: HeartbeatACKEvent = {
    op: 11
  };

  zlibSend(socket, JSON.stringify(message));
}
