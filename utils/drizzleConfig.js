let TEMPLATE;
export const drizzleConfig = (db, provider) => {
  switch (db) {
    case "PostgreSQL":
      TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from 'drizzle-kit';


//Configured for ${db} with ${provider}
export default defineConfig({
    dialect:"postgresql",
        schema:"./drizzle/schema.ts",
        out:"./drizzle/migrations",
        dbCredentials:{
            url:process.env.DATABASE_URL as string,
        },
        strict:true,
        verbose:true,

    });`;
      if (provider === "AWS Data API")
        TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from 'drizzle-kit';


//Configured for ${db} with ${provider}
export default defineConfig({
    dialect:"postgresql",
    driver:"aws-data-api",
        schema:"./drizzle/schema.ts",
        out:"./drizzle/migrations",
        dbCredentials:{ // DON'T FORGET TO PASTE YOUR AWS CREDENTIALS BELOW
            database:"",
            resourceArn:"",
            secretArn:""
        },
        strict:true,
        verbose:true,

    });`;

      break;
    case "MySQL":
      TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from 'drizzle-kit';


//Configured for ${db} with ${provider}
export default defineConfig({
    dialect:"mysql",
        schema:"./drizzle/schema.ts",
        out:"./drizzle/migrations",
        dbCredentials:{ 
            url:process.env.DATABASE_URL as string
        },
        strict:true,
        verbose:true,

    });`;
      break;
    case "SQLite":
      TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from 'drizzle-kit';


//Configured for ${db} with ${provider}
export default defineConfig({
    dialect:"sqlite",
        schema:"./drizzle/schema.ts",
        out:"./drizzle/migrations",
        dbCredentials:{ 
            url:process.env.DATABASE_URL as string

        },
        strict:true,
        verbose:true,

    });`;
      if (provider === "Turso")
        TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from "drizzle-kit";

//Configured for ${db} with ${provider}
export default defineConfig({
  dialect: "sqlite",
  driver: "turso",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: { // DON'T FORGET TO INSERT DATABASE_URL AND DATABASE_AUTH_TOKEN in environment variables
    url:process.env.DATABASE_URL as string,
    authToken:process.env.DATABASE_AUTH_TOKEN as string,
  },
  strict: true,
  verbose: true,
});`;
      if (provider === "Cloudflare D1")
        TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from "drizzle-kit";

//Configured for ${db} with ${provider}
export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    accountId: process.env.DATABASE_ACCOUNT_ID as string,
    databaseId: process.env.DATABASE_ID as string,
    token: process.env.DATABASE_TOKEN as string,
  },
  strict: true,
  verbose: true,
});`;
      if (provider === "Expo SQLite")
        TEMPLATE = `//DONT FORGET TO LOAD env variables
import { defineConfig } from "drizzle-kit";

//Configured for ${db} with ${provider}
export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  strict: true,
  verbose: true,
});`;
      break;
    default:
      console.log("something went terribly wrong...");
      break;
  }
  return TEMPLATE;
};
