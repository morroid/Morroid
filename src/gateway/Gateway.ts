import WebSocket from "ws";
import { EventEmitter } from "ws";
import enviroment from "../../enviroment";
import { IdentifyEvent } from "../payload/GatewayPayload";

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
      console.log("[GATEWAY]: A Gateway connection has been picked up.");
      socket.on("message", (data) => {
        const payload: IdentifyEvent = JSON.parse(data.toString());

        this.handlePayload(socket, payload);
      });

      socket.on("close", () => {
        console.log("[GATEWAY]: the Gateway connection has been closed.");
      });
    });
  }

  private handlePayload(socket: WebSocket, payload: IdentifyEvent): void {
    switch (payload.op) {
      case 1 as number:
        // Heartbeat ACK
        Heartbeat(socket, payload);
        break;
      case 2 as number:
        // Identify & Dispatch
        Identify(socket, payload);
        break;

      default:
        console.warn(`[GATEWAY]: Unknown op code: ${payload.op}`);
        break;
    }
  }
}
