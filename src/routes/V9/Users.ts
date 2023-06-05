import { Router } from "express";
import axios from "axios";
import settings from "../../../settings";
const app = Router();
app.get("/:userid/relationships", async (req, res) => {
  let {
    username,
    global_name,
    avatar,
    discriminator,
    public_flags,
    avatar_decoration,
  } = req.body;

  res.json([
    {
      id: req.params.userid,
      username,
      global_name,
      avatar,
      discriminator,
      public_flags,
      avatar_decoration,
    },
  ]);
});

app.get("/:userid", async (req, res) => {
  let {
    username,
    avatar,
    discriminator,
    public_flags,
    flags,
    banner,
    accent_color,
    global_name,
    avatar_decoration,
    display_name,
    banner_color,
  } = req.body;

  res.json({
    id: req.params.userid,
    username,
    avatar,
    discriminator,
    public_flags,
    flags,
    banner,
    accent_color,
    global_name,
    avatar_decoration,
    display_name,
    banner_color,
  });
});
app.get("/:userid/profile", async (req, res) => {
  // todo: ?with_mutual_guilds=false&with_mutual_friends_count=false and work for any user

  let {
    username,
    global_name,
    discriminator,
    avatar,
    public_flags,
    flags,
    banner,
    banner_color,
    accent_color,
    bio,
    avatar_decoration,
    connected_accounts,
    premium_since,
    premium_type,
    premium_guild_since,
    profile_themes_experiment_bucket,
  } = req.body;

  res.json({
    user: {
      id: req.params.userid,
      username,
      global_name,
      avatar,
      discriminator,
      public_flags,
      flags,
      banner,
      banner_color,
      accent_color,
      bio,
      avatar_decoration,
    },
    connected_accounts,
    premium_since,
    premium_type,
    premium_guild_since,
    profile_themes_experiment_bucket,
    user_profile: {
      bio,
      accent_color,
    },
    badges: [
      {
        id: "hypesquad_house_1",
        description: "HypeSquad Bravery",
        icon: "8a88d63823d8a71cd5e390baa45efa02",
        link: "https://discord.com/settings/hypesquad-online",
      },
      {
        id: "active_developer",
        description: "Active Developer",
        icon: "6bdc42827a38498929a4920da12695d9",
        link: "https://support-dev.discord.com/hc/en-us/articles/10113997751447?ref=badge",
      },
      {
        id: "premium",
        description: "Subscriber since May 10, 2023",
        icon: "2ba85e8026a8614b640c2837bcdfe21b",
        link: "https://discord.com/settings/premium",
      },
    ],
    guild_badges: [],
    legacy_username: "TestUser",
  });
});
app.get("/@me/channels", async (req, res) => {
  let {
    id,
    last_message_id,
    last_pin_timestamp,
    username,
    global_name,
    avatar,
    discriminator,
    public_flags,
    avatar_decoration,
  } = req.body;

  res.json([
    {
      id,
      type: 3,
      last_message_id,
      flags: 0,
      last_pin_timestamp,
      recipients: [
        {
          id,
          username,
          global_name,
          avatar,
          discriminator,
          public_flags,
          avatar_decoration,
        },
      ],
    },
  ]);
});
app.get("/@me/dms/:userid", async (req, res) => {
  let {
    last_message_id,
    username,
    global_name,
    avatar,
    discriminator,
    public_flags,
    avatar_decoration,
  } = req.body;

  res.json({
    id: req.params.userid,
    type: 1,
    last_message_id,
    flags: 0,
    recipients: [
      {
        id: req.params.userid,
        username,
        global_name,
        avatar,
        discriminator,
        public_flags,
        avatar_decoration,
      },
    ],
  });
});
app.get("/@me/settings-proto/:int", async (req, res) => {
  if (req.params.int === "1") {
    return res.json({
      settings: settings.settings_test,
    });
  } else {
    return res.json({
      settings: settings.settings_other,
    });
  }
});
app.get("/@me/activities/statistics/applications", async (req, res) => {
  res.json([]);
});
app.get("/users/@me/clyde-consent", async (req, res) => {
  res.json({
    consent_status: 0,
  });
});
app.get("/users/@me/burst-credits", async (req, res) => {
  res.json({
    consent_status: 0,
  });
});
app.get("/users/@me/affinities/users", async (req, res) => {
  res.json({
    "user_affinities": [],
    "inverse_user_affinities": []
});
});
app.get("/@me/applications/:id/entitlements", (req, res) => {
  let {
    sku_id,
    application_id,
    user_id,
    promotion_id,
    type,
    deleted,
    gift_code_flags,
    consumed,
    gifter_user_id,
    parent_id,
    subscription_plan,
  } = req.body;

  res.json([
    {
      id: req.params.id,
      sku_id,
      application_id,
      user_id,
      promotion_id,
      type,
      deleted,
      gift_code_flags,
      consumed,
      gifter_user_id,
      parent_id,
      subscription_plan: {},
    },
  ]);
});

export = app;
