#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import { dbContent } from "./utils/db.js";
import { drizzleConfig } from "./utils/drizzleConfig.js";
import { schemaContent } from "./utils/schema.js";
import { tagline } from "./utils/tagline.js";
import { updateScripts } from "./utils/updateScripts.js";

let PROVIDER, DATABASE, SCRIPTS, ENV,VERSION,DESCRIPTION;

tagline("drizzle-init");
// getVersion().then(r=>{program.version(r.version).description(r.desc);}).catch(console.error);
async function runCLI() {
    try {
        program.action(async () => {
            DATABASE = await inquirer.prompt([
              {
                type: "list",
                name: "choose",
                message: "Choose your database?",
                choices: ["PostgreSQL", "MySQL", "SQLite", "Exit..."],
              },
            ]);
            switch (DATABASE.choose) {
              case "PostgreSQL":
                PROVIDER = await inquirer.prompt([
                  {
                    type: "list",
                    name: "choose",
                    message: "What are you using?",
                    choices: [
                      "Neon",
                      "Xata",
                      "PostgresJS",
                      "PGlite",
                      "node-postgres",
                      "Cloudflare",
                      "Vercel Postgres",
                      "Supabase",
                      "AWS Data API",
                      "HTTP Proxy",
                      "exit...",
                    ],
                  },
                ]);
                if (PROVIDER.choose === "exit...") process.exit(0);
          
                break;
          
              case "SQLite":
                PROVIDER = await inquirer.prompt([
                  {
                    type: "list",
                    name: "choose",
                    message: "What are you using?",
                    choices: [
                      "Turso",
                      "Cloudflare D1",
                      "Bun sqlite",
                      "React Native SQLite",
                      "Expo SQLite",
                      "better-sqlite3",
                      "HTTP Proxy",
                      "exit...",
                    ],
                  },
                ]);
                if (PROVIDER.choose === "exit...") process.exit(0);
          
                break;
              case "MySQL":
                PROVIDER = await inquirer.prompt([
                  {
                    type: "list",
                    name: "choose",
                    message: "What are you using?",
                    choices: ["planetScale", "Mysql2", "HTTP proxy", "TiDB Serverless"],
                  },
                ]);
                if (PROVIDER.choose === "exit...") process.exit(0);
          
                break;
              case "Exit...":
                process.exit(0);
                break;
              default:
                console.log("no option selected");
                break;
            }
            SCRIPTS = await inquirer.prompt([
              {
                type: "confirm",
                name: "confirm",
                message:
                  "Do you want to add drizzle-kit scripts into package.json for easier access?",
              },
            ]);
            if (SCRIPTS.confirm) updateScripts();
            fs.mkdir("drizzle/migrations", { recursive: true }, (err) => {
              if (err) {
                console.error(`An error occurred while creating the directory: ${err}`);
              } else {
                console.log(
                  `Directory 'drizzle' and 'migrations' was created successfully.`,
                );
                fs.writeFile(
                  "drizzle/schema.ts",
                  schemaContent(DATABASE.choose,PROVIDER.choose),
                  "utf8",
                  (e) => {
                    if (e) {
                      console.error(`An error occurred while creating the directory: ${e}`);
                    } else {
                      console.log(`${chalk.green("schema.ts")} was created successfully.`);
                    }
                  },
                );
                fs.writeFile(
                  "drizzle/db.ts",
                  dbContent(DATABASE.choose,PROVIDER.choose),
                  "utf8",
                  (e) => {
                    if (e) {
                      console.error(`An error occurred while creating the directory: ${e}`);
                    } else {
                      console.log(`${chalk.green("db.ts")} was created successfully.`);
                    }
                  },
                );
              }
            });
          
            
          
            fs.writeFile(
              "drizzle.config.ts",
              drizzleConfig(DATABASE.choose, PROVIDER.choose),
              "utf8",
              (e) => {
                if (e) {
                  console.error(
                    chalk.red("An error occurred while writing to the file:"),
                    e,
                  );
                } else {
                  console.log(
                    chalk.green("drizzle.config.ts has been created successfully."),
                  );
                }
              },
            );
          
            // ENV = fs.appendFile(
            //   ".env",
            //   `
            //   DATABASE_URL=PASTE_YOUR_DATABASE_URL_HERE
            //   DATABASE_TOKEN=PASTE_AUTH_TOKEN_HERE`,
            //   "utf8",
            //   (e) => {
            //     if (e) {
            //       console.error(
            //         chalk.red("An error occurred while writing to the file:"),
            //         e,
            //       );
            //     } else {
            //       console.log(chalk.green(".env has been created successfully."));
            //     }
            //   },
            // );
          });

          program.parse(process.argv);
    } catch (error) {
        if (error instanceof inquirer.errors.ExitPromptError) {
            console.log(chalk.blue('\nThank you for using drizzle-init CLI!'));
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}




process.on('SIGINT', () => {
    console.log(chalk.blue('\nThank you for using drizzle-init CLI!'));
    process.exit();
});

runCLI()