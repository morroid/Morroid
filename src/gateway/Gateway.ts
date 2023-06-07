import WebSocket from "ws";
import { EventEmitter } from "node:events";

export default class Gateway extends EventEmitter {
  private socket: WebSocket.Server;

  constructor() {
    super();

    this.socket = new WebSocket.Server(
      {
        noServer: true,
        path: "/connect",
      },
      () => console.log("[GATEWAY]: WebSocket server has been created.")
    );

    this.emit("connection", this.onConnection);
    this.emit("logged_in", this.onLoggedIn);
    this.emit("error", this.onError);
    this.emit("close", this.onClosed);
  }

  onConnection(): void {
    // (Skiesuwu): TODO...
  }

  onLoggedIn(): void {
    // (Skiesuwu): TODO...
  }

  onError(): void {
    // (Skiesuwu): TODO...
  }

  onClosed(): void {
    // (Skiesuwu): TODO...
  }
}
