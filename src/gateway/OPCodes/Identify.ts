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

export default async function Identify(
  socket: WebSocket,
  data: IdentifyEvent
): Promise<void> {
  let { d } = data;

  const token = await checkToken(d.token as string);
  const user = await UserSchema.findOne({
    id: token?.decoded.id, // get the user's snowflake(id) from the decoded token.
  });

  if (token) {
    const response = {
      t: "READY",
      s: 1,
      op: 0,
      d: {
        v: 9,
        users: [],
        user_settings_proto: "",
        user_guild_settings: {
          version: 1,
          partial: false,
          entries: [],
        },
        user: {
          verified: true,
          username: "sky",
          purchased_flags: 0,
          pronouns: "",
          premium_type: 0,
          premium: false,
          phone: null,
          nsfw_allowed: true,
          mobile: true,
          mfa_enabled: true,
          id: "123456789012345678",
          global_name: "Sky",
          flags: 0,
          email: "a@a.a",
          discriminator: "0",
          desktop: false,
          bio: "",
          banner_color: null,
          banner: null,
          avatar_decoration: null,
          avatar: null,
          accent_color: null,
        },
        tutorial: null,
        sessions: [],
        session_type: "normal",
        session_id: "",
        resume_gateway_url: "wss://gateway.discord.gg",
        relationships: [],
        read_state: {
          version: 1,
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
      },
    };
    Logger.log(`Event - READY`);
    Logger.debug(JSON.stringify(response));
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
