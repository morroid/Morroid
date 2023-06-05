import { Router } from "express";
import axios from "axios";
const app = Router();

app.get("/", async (req, res) => {
  return await axios
    .get("https://discord.com/api/v9/experiments")
    .then((response) => {
      res.json(response.data);
    });
});
export = app;
