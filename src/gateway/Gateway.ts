import WebSocket from "ws";
import { EventEmitter } from "ws";
import enviroment from "../../enviroment";
import {
  IdentifyEvent,
  HelloEvent,
  HeartbeatAckEvent,
  GatewayEvent,
  HeartbeatEvent,
} from "../payload/GatewayPayload";
import Logger from "../utils/logging";
import { zlibSend } from "../utils/zlibSend";

// ******************** OPCODES ********************

import Identify from "./OPCodes/Identify";
import Heartbeat from "./OPCodes/Heartbeat";

// ******************** END ********************

export default class Gateway extends EventEmitter {
  private wss: WebSocket.Server;

  constructor() {
    super();

    this.wss = new WebSocket.Server({ port: enviroment.GATEWAY_PORT }, () =>
      Logger.log(`Gateway has started with the port ${enviroment.GATEWAY_PORT}`)
    );
  }

  public init(): void {
    this.wss.on("connection", (socket) => {
      Logger.log("A Gateway connection has been picked up.");

      socket.on("message", (data) => {
        const payload: IdentifyEvent = JSON.parse(data.toString());

        this.handlePayload(socket, payload);
      });

      socket.on("close", () => {
        Logger.log("the Gateway connection has been closed.");
      });

      this.handleHello(socket);
    });
  }

  handleHello(socket: WebSocket): void {
    return zlibSend(
      socket,
      JSON.stringify(
        ({
          op: 10,
          d: {
            heartbeat_interval: 30000,
          },
        } satisfies HelloEvent)
      )
    );
  }

  private handlePayload(socket: WebSocket, payload: GatewayEvent): void {
    switch (payload.op) {
      case 1:
        // Heartbeat ACK
        Heartbeat(socket, payload as HeartbeatEvent);
        break;
      case 2:
        // Identify
        Identify(socket, payload as IdentifyEvent);
        break;

      default:
        Logger.warn(`Unknown op code: ${payload.op}`);
        break;
    }
  }
}
