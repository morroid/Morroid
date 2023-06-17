import WebSocket from "ws";
import {
  IdentifyEvent,
  InvalidSessionEvent,
  ReadyEvent,
} from "../../payload/GatewayPayload";
import checkToken from "../../utils/checkToken";
import UserSchema from "../../models/UserSchema";
import Logger from "../../utils/logging";
import { zlibSend } from "../../utils/zlibSend";
var flags: number = 0;

export default async function Identify(
  socket: WebSocket,
  data: IdentifyEvent
): Promise<void> {
  let { d } = data;
  const token = await checkToken(d.token);
  const user = await UserSchema.findOne({
    id: token?.decoded.id, // get the user's snowflake(id) from the decoded token.
  });
  let users: any[] = [];

  if (token) {
    const response: ReadyEvent = {
      op: 0,
      t: "READY",
      s: data.s as number,
      d: {
        v: 9,
        users: users.filter((x) => x === user?.username),
        user_settings_proto: "",
        user_guild_settings: {
          version: 642,
          partial: false,
          entries: [],
        },
        user: {
          verified: true,
          username: user!.username,
          purchased_flags: 0,
          pronouns: "",
          premium_type: 0,
          premium: false,
          phone: null,
          nsfw_allowed: true,
          mobile: true,
          mfa_enabled: true,
          id: user?.id,
          global_name: user?.username,
          flags: flags ?? 0,
          email: user?.email,
          discriminator: "0000",
          desktop: false,
          bio: "Welcome to Morroid.",
          banner_color: null,
          banner: null,
          avatar_decoration: null,
          avatar: undefined,
          accent_color: undefined,
        },
        sessions: [],
        session_id: "",
        resume_gateway_url: "wss://gateway.discord.gg",
        relationships: [],
        read_state: {
          version: 304128,
          partial: false,
          entries: [],
        },
        private_channels: [],
        merged_members: [],
        guilds: [],
        guild_join_requests: [],
        guild_experiments: [],
        geo_ordered_rtc_regions: [],
        friend_suggestion_count: 0,
        experiments: [],
        country_code: "US",
        consents: {
          personalization: {
            consented: true,
          },
        },
        connected_accounts: [],
        auth_session_id_hash: "",
        api_code_version: 1,
        analytics_token: "",
        application: {
          id: user?.id,
          flags: flags ?? 0,
        },
      },
    };
    zlibSend(socket, JSON.stringify(response));
  } else {
    const response: InvalidSessionEvent = {
      op: 9,
      d: false,
    };

    Logger.error("Invalid Session.");

    zlibSend(socket, JSON.stringify(response));
    socket.close();
  }
}
