import { Router } from "express";

const app = Router();

app.all("/", async (req, res) => {
  let { token, events } = req.body;

  res.json({
    token,
    events,
  });
});
export = app;
