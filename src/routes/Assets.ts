import { Router } from "express";
import axios from "axios";
const app = Router();

app.get("/:assetId", async (req, res) => {
  return await axios
    .get(`https://discord.com/assets/${req.params.assetId}`)
    .then((response) => {
      console.log(
        `assetPath: https://discord.com/assets/${req.params.assetId}`
      );
      res.json(response.data);
    });
});

export = app;
