import {
  ConnectionProperties,
  UpdatePresence,
  user,
  GuildPreview,
  UnavailableGuild,
  application,
} from "../types/EventTypes";

type JSONValue =
  | string
  | object
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface GatewayEvent {
  op: number;
  d?: JSONValue;
  s?: number | null;
  t?: string | null;
}

export interface HelloEvent extends GatewayEvent {
  op: 10;
  d: {
    heartbeat_interval: number;
    _trace?: Array<string>;
  };
}

export interface DispatchEvent extends GatewayEvent {
  op: 0;
  t: string;
}

export interface IdentifyEvent extends GatewayEvent {
  op: 2;
  d: {
    token: string;
    properties: ConnectionProperties;
    compress?: boolean;
    large_threshold?: number;
    shard?: [number, number];
    presence?: UpdatePresence;
    intents: number;
  };
}

export interface ReadyEvent extends DispatchEvent {
  d: {
    v: number;
    users?: Array<object>;
    user_settings_proto?: string;
    user_guild_settings: {
      version?: number;
      partial?: boolean;
      entries?: [];
    };
    tutorial?: null;
    sessions?: [];
    relationships?: [];
    session_type: string;
    read_state?: object;
    private_channels?: [];
    merged_members?: [];
    guild_join_requests?: [];
    guild_experiments?: [];
    geo_ordered_rtc_regions?: [];
    friend_suggestion_count?: 0;
    experiments?: [];
    country_code: "US";
    consents?: object;
    connected_accounts?: [];
    auth_session_id_hash?: string;
    api_code_version?: number;
    analytics_token?: string;
    user: user;
    guilds: Array<UnavailableGuild>;
    session_id: string;
    resume_gateway_url: string;
    shard?: [number, number];
    application: application;
  };
  s: number;
  t: "READY" | "Ready";
}

export interface InvalidSessionEvent extends GatewayEvent {
  op: 9;
  d: boolean;
}
export interface HeartbeatEvent extends GatewayEvent {
  op: 1;
  d: number;
}

export interface HeartbeatAckEvent extends GatewayEvent {
  op: 11;
}
