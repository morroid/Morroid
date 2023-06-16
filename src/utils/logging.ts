import chalk from "chalk";

export default {
  debug(...args: unknown[]) {
    console.log(chalk.bgGreen(" DEBUG "), ...args);
  },
  log(...args: unknown[]) {
    console.log(chalk.bgBlue(" INFO "), ...args);
  },
  warn(...args: unknown[]) {
    console.log(chalk.bgRedBright(" WARN "), ...args);
  },
  error(...args: unknown[]) {
    console.log(chalk.bgRed(" ERROR "), ...args);
  },
};
