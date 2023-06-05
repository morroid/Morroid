import { connect } from "mongoose";
import Config from "../../enviroment";

export default class Database {
  /**
   * This connects us to our database of choice `mongodb`.
   * @returns Database connection has been established.
   */
  static connect(): Promise<void> {
    return connect(Config.DatabaseConfiguration.mongodbUri).then(() => {
      console.log("[DATABASE]: Database connection has been established.");
    });
  }
}
