import express, { Application, Request, Response } from "express";
import { setConfigurations } from "./utils/serverConfigurations";
import enviroment from "../enviroment";
import Database from "./db/Database";

// ******************************** Routes ********************************

import Assets from "./routes/Assets";
import Users from "./routes/V9/Users";
import Experiments from "./routes/V9/Experiments";
import Auth from "./routes/V9/Auth";
import Applications from "./routes/V9/Applications";
import Channels from "./routes/V9/Channels";

/// ******************************** END ********************************

export default class Server {
  private app: Application;
  private port = process.env.PORT || enviroment.PORT;

  constructor() {
    this.app = express();
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
      console.info(`[SERVER]: Morroid has started on port - ${this.port}`);
    });

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
    this.app.use("/assets", Assets);
    this.app.use("/api/V9/experiments", Experiments);
    this.app.use("/api/v9/users", Users);
    this.app.use("/api/v9/auth", Auth);
    this.app.use("/api/v9/applications", Applications);
    this.app.use("/api/v9/channels", Channels);
  }
}
