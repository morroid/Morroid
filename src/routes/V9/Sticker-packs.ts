import { Router } from "express";
import axios from "axios";
import settings from "../../../settings";
const app = Router();
app.get("/sticker-packs/:stickerid", async (req, res) => {
  res.json(
    {
      "id": req.params.stickerid,
      "stickers": [{
          "id": "749052944682582036",
          "name": "Dance",
          "tags": "wumpus, dance, \ud83d\udc83, \ud83d\udd7a, \ud83e\udd73, :dance, dancing, party, dan\u00e7a, music, :music, \ud83c\udfb6, \ud83c\udfb5, \ud83c\udfa7, headphones, :headphones,",
          "type": 1,
          "format_type": 3,
          "description": "Wumpus dancing with headphones on",
          "asset": "",
          "pack_id": "847199849233514549",
          "sort_value": 1
      }
    ]
  });
});
export = app;
