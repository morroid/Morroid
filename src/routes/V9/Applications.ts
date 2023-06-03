import { Router } from "express";
import axios from "axios";
const app = Router();

app.get("/detectable", async (req, res) => {
  return await axios
    .get("https://discord.com/api/v9/applications/detectable")
    .then((response) => {
      res.json(response.data);
    });
});

app.get("/public", async (req, res) => {
  let {
    id,
    name,
    icon,
    description = "TBD",
    summary = "TBD",
    type,
    cover_image,
    hook,
    verify_key,
    flags,
  } = req.body;

  res.json([
    {
      id,
      name,
      icon,
      description,
      summary,
      type,
      cover_image,
      hook,
      verify_key,
      flags,
    },
  ]);
});

export = app;
