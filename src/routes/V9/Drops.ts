import { Router } from "express";
const app = Router();

app.get("/eligibility", (req, res) => {
  res
    .json({
      eligible: true,
    })
    .status(200);
});

export = app;
