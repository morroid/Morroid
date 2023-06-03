import Server from "./Server";
import dotenv from "dotenv";
import { resolve } from "path";

const app = new Server();

dotenv.config({ path: resolve(__dirname, "..", ".env") });

function main() {
  app.start();
}

main();
