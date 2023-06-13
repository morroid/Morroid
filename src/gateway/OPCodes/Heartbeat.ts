import { WebSocketServer } from "ws";
import broadcastEvent from "../../utils/broadcastEvent";

export default function Heartbeat(socket: WebSocketServer): NodeJS.Timer {
  return setTimeout(() => {
    broadcastEvent(socket, { op: 1, d: null }) as void;
  }, 5000);
}
