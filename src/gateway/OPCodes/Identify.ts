import WebSocket from "ws";
import {
  IdentifyEvent,
  InvalidSessionEvent,
  ReadyEvent,
} from "../../payload/GatewayPayload";
import checkToken from "../../utils/checkToken";

export default async function Identify(
  socket: WebSocket,
  data: IdentifyEvent
): Promise<void> {
  let { d } = data;

  const user = await checkToken(d.token as string);

  if (user) {
    const response: ReadyEvent = {
      t: "Ready",
      op: 0,
      d: data.d as any,
    };
    socket.send(JSON.stringify(response));

    const readyPayload: IdentifyEvent = {
      t: "Identify",
      op: 2,
      d,
    };
    socket.send(JSON.stringify(readyPayload));
  } else {
    const response: InvalidSessionEvent = {
      op: 9,
      d: false,
    };

    console.error("[GATEWAY]: Invalid xSession.");

    socket.send(JSON.stringify(response));
    socket.close();
  }
}
