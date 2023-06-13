import { Router } from "express";
const app = Router();

app.get("/marketing/nag-activate/eligibility", (req, res) => {
  res
    .json({
      eligible_guilds: [],
    })
    .status(200);
});

export = app;
