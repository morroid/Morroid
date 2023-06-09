import express, { Application, Request, Response } from "express";
import { setConfigurations } from "./utils/serverConfigurations";
import enviroment from "../enviroment";
import Database from "./db/Database";
import Gateway from "./gateway/Gateway";
import Logger from "./utils/logging";

// ******************************** Routes ********************************

import Users from "./routes/V9/Users";
import Stickerpacks from "./routes/V9/Sticker-packs";
import Experiments from "./routes/V9/Experiments";
import Science from "./routes/V9/Science";
import Auth from "./routes/V9/Auth";
import Applications from "./routes/V9/Applications";
import Channels from "./routes/V9/Channels";
import Drops from "./routes/V9/Drops";
import CreatorMonetization from "./routes/V9/CreatorMonetization";
import Guilds from "./routes/V9/Guilds";
import Status from "./routes/V2/Status";

/// ******************************** END ********************************

export default class Server {
  private app: Application;
  private port = process.env.PORT || enviroment.PORT;
  private gateway: Gateway;

  constructor() {
    this.app = express();
    this.gateway = new Gateway();
  }

  /**
   * Set the Server configurations.
   */
  setConfigurations(): void {
    return setConfigurations(this.app);
  }

  /**
   * Starts the express Server.
   */
  start(): void {
    this.setConfigurations();

    this.app.listen(this.port, () => {
      Logger.log(`Morroid has started on port - ${this.port}`);
    });

    this.gateway.init();
    this.dbConnect();
    this.route();
  }

  /**
   * Connects to our database.
   */
  dbConnect(): Promise<void> {
    const db = Database;

    return db.connect();
  }

  /**
   * Every Route we will be needing.
   */
  route(): void {
    this.app.use("/api/V9/experiments", Experiments);
    this.app.use("/api/V9/science", Science);
    this.app.use("/api/v9/users", Users);
    this.app.use("/api/v9/sticker-packs", Stickerpacks);
    this.app.use("/api/v9/auth", Auth);
    this.app.use("/api/v9/applications", Applications);
    this.app.use("/api/v9/channels", Channels);
    this.app.use("/api/v9/drops", Drops);
    this.app.use("/api/v9/creator-monetization", CreatorMonetization);
    this.app.use("/api/v9/guilds", Guilds);

    // V2 API
    this.app.use("/api/v2", Status);
  }
}
