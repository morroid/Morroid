import { Router } from "express";
import axios from "axios";
const app = Router();
app.get("/:channelid", async (req, res) => {
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
    id: req.params.channelid,
    type: 0,
    last_message_id,
    flags: 0,
    recipients: [
      {
        id: req.params.channelid,
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
app.get("/:channelid/messages", async (req, res) => {
  let {
    username,
    global_name,
    avatar,
    discriminator,
    public_flags,
    avatar_decoration,
    channel_id,
  } = req.body;
  res.json([
    {
      id: req.params.channelid,
      channel_id,
      type: 0,
      content: "m",
      flags: 0,
      author: {
        id: "m",
        username: "m",
        global_name: null,
        avatar: "d0b0bb32bc2c02e8f4ecd5e6ff91c83a",
        discriminator: "9291",
        public_flags: 0,
        avatar_decoration: null,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: "2023-06-05T20:36:35.640000+00:00",
      edited_timestamp: null,
      components: [],
    },
  ]);
});
export = app;
