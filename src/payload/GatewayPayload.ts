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
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface GatewayEvent {
  op: number;
  d?: JSONValue;
  s?: number;
  t?: string;
}

export interface HelloEvent extends GatewayEvent {
  op: 10;
  d: {
    heartbeat_interval: number;
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
