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

export interface DispatchEvent extends GatewayEvent {
  op: 0;
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
}

export interface InvalidSessionEvent extends GatewayEvent {
  op: 9;
  d: boolean;
}
