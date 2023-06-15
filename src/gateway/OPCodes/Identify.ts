import WebSocket from "ws";
import {
  IdentifyEvent,
  InvalidSessionEvent,
  ReadyEvent,
} from "../../payload/GatewayPayload";
import checkToken from "../../utils/checkToken";
import UserSchema from "../../models/UserSchema";

export default async function Identify(
  socket: WebSocket,
  data: IdentifyEvent
): Promise<void> {
  let { d } = data;

  const user = await checkToken(d.token as string);
  const session_id = Math.round(Math.random() * 100);

  if (user) {
    const response: ReadyEvent = {
      t: "Ready",
      s: session_id,
      op: 0,
      d: {
        v: 9,
        user: {
          id: "1234",
          username: "Sky",
          discriminator: "0000",
        },
        guilds: [{ id: "sexyuser123", unavailable: true }],
        session_id: session_id.toString(),
        resume_gateway_url: "wss://gateway.discord.gg",
        application: {
          id: "69",
          name: "Sky",
          description: "We love morroid!",
          bot_public: false,
          bot_require_code_grant: false,
          summary: "",
          verify_key: "no",
        },
      },
    };
    console.log(`[GATEWAY]: Event - READY ${response.d}`);
    socket.send(JSON.stringify(response));
  } else {
    const response: InvalidSessionEvent = {
      op: 9,
      d: false,
    };

    console.error("[GATEWAY]: Invalid Session.");

    socket.send(JSON.stringify(response));
    socket.close();
  }
}
