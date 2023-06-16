import WebSocket from "ws";

export function timeout(socket: WebSocket, ms: number): NodeJS.Timeout {
  if (NodeJS.Timeout) clearTimeout(ms);

  return setTimeout(() => {
    return socket.close(0, "Session has been timed out.");
  }, ms);
}
