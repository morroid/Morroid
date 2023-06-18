import chalk, { Chalk } from "chalk";
import enviroment from "../../enviroment";

export default {
  log(message: string): void {
    logMessage(message, "Discord", "greenBright");
  },

  debug(message: string): void {
    logMessage(message, "Debug", "blueBright");
  },

  error(message: string): void {
    logMessage(message, "Error", "redBright");
  },

  warn(message: string): void {
    logMessage(message, "Warn", "yellowBright");
  },
};

function logMessage(message: string, type: string, color: keyof Chalk): void {
  const timestamp = new Date().toISOString();
  const chalkColor: any = chalk[color];

  const portPattern = /(\d+)/g;
  const Ports = `${enviroment.PORT}${enviroment.GATEWAY_PORT}`;
  const matches = message.match(portPattern);

  if (matches) {
    const formattedMessage = matches.reduce((acc, match) => {
      const port = parseInt(match, 10);
      const highlightColor =
        port === parseInt(Ports, 10) ? chalk.greenBright : chalkColor;
      return acc.replace(match, highlightColor(match));
    }, message);

    const finalMessage = `${chalk.gray(timestamp)} [${chalkColor(
      type
    )}] ${formattedMessage}`;
    console.log(finalMessage);
  } else {
    const formattedMessage = `${chalk.gray(timestamp)} [${chalkColor(
      type
    )}] ${message}`;
    console.log(formattedMessage);
  }
}
