import { Router } from "express";
import axios from "axios";
const app = Router();

app.get("/experiments", async (req, res) => {
  return await axios
    .post("https://discord.com/api/v9/experiments")
    .then((response) => {
      res.json(response.data);
    });
});
export = app;
