import { WebSocket } from "ws";
import {
  HeartbeatAckEvent as HeartbeatACKEvent,
  HeartbeatEvent,
} from "../../payload/GatewayPayload";
import { zlibSend } from "../../utils/zlibSend";
import { timeout } from "../../utils/timeout";

export default function Heartbeat(socket: WebSocket): void {
  timeout(socket, 45000);

  const message: HeartbeatACKEvent = {
    op: 11,
  };

  zlibSend(socket, JSON.stringify(message));
}
