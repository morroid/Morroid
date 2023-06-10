import WebSocket, { WebSocketServer } from "ws";
import { EventEmitter } from "node:events";

export default class Gateway extends EventEmitter {
  private socket: WebSocket.Server;
  private interval: number;

  constructor() {
    super();

    this.interval = 0;

    this.socket = new WebSocket.Server(
      {
        port: 7777,
        path: "/connect",
      },
      () => console.log("[GATEWAY]: WebSocket server has been created.")
    );
  }

  init(): void {
    this.emit("connection", this.onConnection);
    // this.emit("error", this.onError);
    this.emit("close", this.onClosed);
  }

  onConnection(): void {
    this.socket.on("connection", (websocket) => {
      console.log("[GATEWAY]: New Connection");

      websocket.on("open", () => {
        console.log("[GATEWAY]: An Connection has been opened.");

        // TODO (Skiesuwu): Finish onOpen
      });

      websocket.on("message", (data: any) => {
        console.log(data.toString());

        // TODO (Skiesuwu): Finish onMessage
      });
    });
  }

  // onError(): void {
  //   this.socket.on("error", (error) => {
  //     return console.log(`[GATEWAY]: An error has been caught: ${error}`);
  //   });
  // }

  onClosed(): void {
    this.socket.on("close", () => {
      return console.log(
        "[GATEWAY]: The WebSocket connection has been closed."
      );
    });
  }
}
