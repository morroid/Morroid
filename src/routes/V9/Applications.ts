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

app.get("/:id/entitlements", (req, res) => {
  res.json([
    {
      id: req.params.id,
      sku_id: req.body.sku_id,
      application_id: req.body.application_id,
      user_id: req.body.user_id,
      promotion_id: null,
      type: 6,
      deleted: false,
      gift_code_flags: 1,
      consumed: false,
      gifter_user_id: req.body.gifter_user_id,
      parent_id: req.body.parent_id,
      subscription_plans: {
        id: req.params.id,
        name: "Nitro Monthly",
        interval: 1,
        interval_count: 1,
        tax_inclusive: true,
        sku_id: req.body.sku_id,
      },
    },
  ]);
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
