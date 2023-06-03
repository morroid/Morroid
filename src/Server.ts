import express, { Application, Request, Response } from "express";
import { setConfigurations } from "./utils/serverConfigurations";
import enviroment from "../enviroment";

// ******************************** Routes ********************************

import Assets from "./routes/Assets";
import V9API from "./routes/V9API";

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
  }

  /**
   * Every Route we will be needing.
   */
  route(): void {
    this.app.use("/assets", Assets);
    this.app.use("/api/v9", V9API);
  }
}
