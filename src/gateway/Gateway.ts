import WebSocket from "ws";
import { EventEmitter } from "ws";
import enviroment from "../../enviroment";
import { GatewayPayload } from "../payload/GatewayPayload";

// ******************** OPCODES ********************

import Identify from "./OPCodes/Identify";
import Heartbeat from "./OPCodes/Heartbeat";

// ******************** END ********************

export default class Gateway extends EventEmitter {
  private wss: WebSocket.Server;

  constructor() {
    super();

    this.wss = new WebSocket.Server({ port: enviroment.GATEWAY_PORT }, () =>
      console.log(
        `[GATEWAY]: Gateway has started with the port ${enviroment.GATEWAY_PORT}`
      )
    );
  }

  public init(): void {
    this.wss.on("connection", (socket) => {
      socket.on("message", (data) => {
        const payload: GatewayPayload = JSON.parse(data.toString());
        this.handlePayload(socket, payload);
      });

      socket.on("close", () => {
        console.log("[GATEWAY]: the Gateway connection has been closed.");
      });
    });
  }

  private handlePayload(socket: WebSocket, payload: GatewayPayload): void {
    switch (payload.op) {
      case 1:
        // Start Heartbeating
        Heartbeat(this.wss);
        break;
      case 2:
        // Identify
        Identify(socket, payload.d);
        break;

      default:
        console.warn(`[GATEWAY]: Unknown op code: ${payload.op}`);
        break;
    }
  }
}
