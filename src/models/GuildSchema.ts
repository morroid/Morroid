import { Schema, model } from "mongoose";

const guildSchema = new Schema({
  id: String,
  name: String,
  region: String,
  icon: String,
  channels: Object,
  guild_template_code: String,
  system_channel_id: String,
  owner_id: String,
  rules_channel_id: String,
});

export default model("Guilds", guildSchema);
