type ReleaseChannel = "stable" | "dev" | "ptb" | "canary";

type snowflake = string;

type scope =
  | "activities.read"
  | "activities.write"
  | "applications.builds.read"
  | "applications.builds.upload"
  | "applications.commands"
  | "applications.commands.update"
  | "applications.commands.permissions.update"
  | "applications.entitlements"
  | "applications.store.update"
  | "bot"
  | "connections"
  | "dm_channels.read"
  | "email"
  | "gdm.join"
  | "guilds"
  | "guilds.join"
  | "guilds.members.read"
  | "identify"
  | "messages.read"
  | "relationships.read"
  | "role_connections.write"
  | "rpc"
  | "rpc.activities.write"
  | "rpc.notifications.read"
  | "rpc.voice.read"
  | "rpc.voice.write"
  | "voice"
  | "webhook.incoming";

type MembershipState = 1 | 2;

type TeamMember = {
  membership_state: MembershipState;
  permissions: Array<string>; // array of strings or what ever
  team_id: snowflake;
  user: user; // (partial)
};

type team = {
  icon?: string;
  id: snowflake;
  members: Array<TeamMember>;
  name: string;
  owner_user_id: snowflake;
};

type GuildFeature =
  | "ANIMATED_BANNER"
  | "ANIMATED_ICON"
  | "APPLICATION_COMMAND_PERMISSIONS_V2"
  | "AUTO_MODERATION"
  | "BANNER"
  | "COMMUNITY"
  | "CREATOR_MONETIZABLE_PROVISIONAL"
  | "CREATOR_STORE_PAGE"
  | "DEVELOPER_SUPPORT_SERVER"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITES_DISABLED"
  | "INVITE_SPLASH"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MORE_STICKERS"
  | "NEWS"
  | "PARTNERED"
  | "PREVIEW_ENABLED"
  | "RAID_ALERTS_DISABLED"
  | "ROLE_ICONS"
  | "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"
  | "ROLE_SUBSCRIPTIONS_ENABLED"
  | "TICKETED_EVENTS_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";

type StickerType = 1 | 2;

type StickerFormat = 1 | 2 | 3 | 4;

type timestamps = {
  start?: number;
  end?: number;
};

type ActivityEmoji = {
  name: string;
  id?: snowflake;
  animated?: boolean;
};

type party = {
  id?: string;
  size?: [number, number];
};

type assets = {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
};

type secrets = {
  join?: string;
  spectate?: string;
  match?: string;
};

type button = {
  label: string;
  url: string;
};

type activity = {
  name: string;
  type: number;
  url?: string;
  created_at: number;
  timestamps?: timestamps;
  application_id?: snowflake;
  details?: string;
  state?: string;
  emoji?: ActivityEmoji;
  party?: party;
  assets?: assets;
  secrets?: secrets;
  instance?: boolean;
  flags?: number;
  buttons?: Array<button>;
};

type RoleTags = {
  bot_id?: snowflake;
  intergration_id?: snowflake;
  premium_subscriber?: null; // TODO: figure out the actual type
  subscription_listing_id?: snowflake;
  available_for_purchase?: null; // TODO: figure out the actual type
  guild_connections?: null;
};

type role = {
  id: snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: Array<RoleTags>;
};

type emoji = {
  id?: snowflake;
  name?: string;
  roles?: Array<role>;
  user?: user;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
};

type sticker = {
  id: snowflake;
  pack_id?: snowflake;
  name: string;
  description?: string;
  tags: string;
  asset?: string;
  type: StickerType;
  format_type: StickerFormat;
  available?: boolean;
  guild_id?: snowflake;
  user?: user;
  sort_value?: number;
};

type InstallParams = {
  scopes: Array<scope>;
  permissions: string;
};

export type ConnectionProperties = {
  $os: string;
  $browser: string;
  $device: string;
  browser_user_agent?: string;
  browser_version?: string;
  os_version?: string;
  referrer?: string;
  referring_domain?: string;
  referrer_current?: string;
  referring_domain_current?: string;
  release_channel?: ReleaseChannel;
  client_build_number?: number;
  client_event_source?: string;
  client_version?: string;
  system_locale?: string;
};

export type UpdatePresence = {
  since?: number;
  activities: Array<activity>;
  status: string;
  afk: boolean;
};

export type user = {
  id: snowflake;
  username: string;
  purchased_flags?: number;
  pronouns?: string;
  premium?: boolean;
  phone?: string | null;
  mobile?: boolean;
  desktop?: boolean;
  bio?: string;
  banner_color?: null;
  avatar_decoration?: null;
  nsfw_allowed?: boolean;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

export type GuildPreview = {
  id: snowflake;
  name: string;
  icon?: string;
  splash?: string;
  discovery_splash?: string;
  emojis: Array<emoji>;
  features: Array<GuildFeature>;
  approximate_member_count: number;
  approximate_presence_count: number;
  description?: string;
  stickers: Array<sticker>;
}; // TODO: NOT USED ANYWHERE

export type UnavailableGuild = {
  id: snowflake;
  unavailable: true;
};

export type application = {
  id: snowflake;
  name: string;
  icon?: string;
  description: string;
  rpc_origins?: Array<string>;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: user; // (partial)
  summary: string; // (DEPRECATED) EMPTY STRING
  verify_key: string;
  team?: Array<team>;
  guild_id?: snowflake;
  primary_sku_id?: snowflake;
  slug?: string;
  cover_image?: string;
  flags?: number;
  tags?: Array<string>;
  install_params?: InstallParams;
  custom_install_url?: string;
  role_connections_verification_url?: string;
};
