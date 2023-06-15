import zlib from "zlib";
import WebSocket from "ws";


export function zlibSend(socket: WebSocket, data: zlib.InputType): void {
  socket.send(zlib.deflateSync(data));
}
