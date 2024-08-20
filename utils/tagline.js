import chalk from "chalk";
import figlet from "figlet";
export const tagline = (title) => {
  console.log(
    chalk.yellow(
      figlet.textSync(title, {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      }),
    ),
  );
};
