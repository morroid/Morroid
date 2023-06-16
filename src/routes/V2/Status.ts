import { Router } from "express";
const app = Router();

app.get("/scheduled-maintenances/active.json", (req, res) => {
  res.json({
    page: {
      id: "srhpyqt94yxb",
      name: "Discord",
      url: "https://discordstatus.com",
      time_zone: "America/USA",
      updated_at: new Date(),
    },
    scheduled_maintenances: [],
  });
});

app.get("/incidents/unresolved.json", (req, res) => {
  res.json({
    page: {
      id: "srhpyqt94yxb",
      name: "Discord",
      url: "https://discordstatus.com",
      time_zone: "America/USA",
      updated_at: new Date(),
    },
    incidents: [],
  });
});

export = app;
