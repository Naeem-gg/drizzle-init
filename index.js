#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from 'fs'
import figlet from "figlet";

console.log(
  chalk.yellow(figlet.textSync("Keep Drizzling", { font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true, }))
    
);
program.version("0.0.3").description("drizzle-init CLI");

program.action(async() => {
  
  const database = await inquirer.prompt([
      {
        type: "list",
        name: "choose",
        message: "Choose your database?",
        choices:["sqlite","postgresql","mysql"]
      },
    ])
    switch (database.choose) {
        case 'postgresql':
            const postgresType = await inquirer.prompt([{
                type: "list",
                name: "choose",
                message: "What are you using?",
                choices:["Neon","Xata","PostgresJS","node-postgres","Vercel Postgres","Supabase","AWS Data API","HTTP Proxy"]
            }])
            console.log(postgresType)
            break;
    
        case 'sqlite':
            const sqliteType = await inquirer.prompt([{
                type: "list",
                name: "choose",
                message: "What are you using?",
                choices:["Turso","Cloudflare D1","Bun sqlite","React Native SQLite","Expo SQLite","better-sqlite3","HTTP Proxy"]
            }])
            console.log(sqliteType)
            break;
            case 'mysql':
                const mysqlType = await inquirer.prompt([{
                    type: "list",
                    name: "choose",
                    message: "What are you using?",
                    choices:["planetScale","Mysql2","HTTP proxy","TiDB Serverless"]
                }])
                console.log(mysqlType)
                break;
    }
    fs.mkdir('drizzle', { recursive: true }, (err) => {
        if (err) {
            console.error(`An error occurred while creating the directory: ${err}`);
        } else {
            console.log(`Directory 'drizzle' was created successfully.`);
        }
    });
    fs.mkdir('drizzle/migrations', { recursive: true }, (err) => {
        if (err) {
            console.error(`An error occurred while creating the directory: ${err}`);
        } else {
            console.log(`Directory 'migrations' was created successfully.`);
        }
    });
    fs.writeFile('drizzle/schema.ts',"import something from 'drizzle-orm'",'utf8',(e)=>{
        if (e) {
            console.error(`An error occurred while creating the directory: ${e}`);
        } else {
            console.log(`${chalk.green('schema.ts')} was created successfully.`);
        }
    })
    fs.writeFile('drizzle/db.ts',"import something from 'drizzle-orm'",'utf8',(e)=>{
        if (e) {
            console.error(`An error occurred while creating the directory: ${e}`);
        } else {
            console.log(`${chalk.green('db.ts')} was created successfully.`);
        }
    })
    const configContent = `import { defineConfig } from 'drizzle-orm';

    export default defineConfig({
        // Your configuration here
        database: "postgresql",
        host: "localhost",
        port: 5432,
        user: "your-username",
        password: "your-password"
    });`;

    fs.writeFile('drizzle.config.ts', configContent, 'utf8', (e) => {
        if (e) {
            console.error(chalk.red('An error occurred while writing to the file:'), e);
        } else {
            console.log(chalk.green('File has been written successfully.'));
        }
    });
    
});

program.parse(process.argv);