import WebSocket from "ws";
import { GatewayPayload, GatewayMessage } from "../../payload/GatewayPayload";
import checkToken from "../../utils/checkToken";

export default function Identify(socket: WebSocket, data: any): void {
  const { token } = data;

  const isValidToken = checkToken(token);

  if (isValidToken) {
    const response: GatewayPayload = {
      op: 2, // Identify OP
      d: {
        accepted: true,
      },
    };
    socket.send(JSON.stringify(response));

    const readyPayload: GatewayPayload = {
      op: 0, // Dispatch
      d: {
        event: "READY",
        data: null,
      },
    };
    socket.send(JSON.stringify(readyPayload));
  } else {
    const response: GatewayPayload = {
      op: 2, // Identify OP
      d: {
        accepted: false,
        reason: "Invalid Token.",
      },
    };

    console.log("[GATEWAY]: Invalid Token.");

    socket.send(JSON.stringify(response));
    socket.close();
  }
}
