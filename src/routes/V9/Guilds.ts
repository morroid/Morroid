import UserSchema from "../../models/UserSchema";
import GuildSchema from "../../models/GuildSchema";
import { Router } from "express";
import Logger from "../../utils/logging";
const app = Router();

// ill rewrite this.
app.post("/", async (req, res) => {
  let body = {
    name: req.body.name,
    region: req.body.region,
    icon: req.body.icon,
    channels: req.body.channels,
    guild_template_code: req.body.guild_template_code,
    system_channel_id: req.body.system_channel_id,
    rules_channel_id: req.body.rules_channel_id,

    owner_id: req.body.user_id,
  };

  const guild = await GuildSchema.findOne({
    ...body,
  });

  if (!guild) {
    return res.json({
      error: "Failed to create guild.",
    });
  }

  try {
    guild?.save().then(() => {
      Logger.log(`Guild has been created with the name: ${guild.name}`);
    });

    res.status(200).json({
      id: guild?.id,
    });
  } catch (err) {
    throw err;
  }
});

// TODO
app.get("/:guildId/templates", (req, res) => {
  res.json([]);
});

// TODO
app.get("/:guildId/entitlements", (req, res) => {
  res.json([]);
});

// TODO
app.get("/:guildId/intergrations", async (req, res) => {
  res.json([]);
});

export = app;
