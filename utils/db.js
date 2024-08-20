let TEMPLATE;
export const dbContent = (db,provider)=>{

    switch (db) {
        case "PostgreSQL":
            switch (provider) {
                case "Neon":
                    TEMPLATE=`import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';


const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql,{schema});`
                    break;
            case "Xata": TEMPLATE = `import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from './xata'; // Generated client
const xata = getXataClient();
export const db = drizzle(xata);`;
break;
case "PostgresJS":TEMPLATE=`import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


const queryClient = postgres(process.env.DATABASE_TOKEN);
export const db = drizzle(queryClient);`;
break;
case "node-postgres":TEMPLATE=`import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();
export const db = drizzle(client);`;
break;
case "Cloudflare": TEMPLATE=`import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const client = new Client({ connectionString: env.DATABASE_URL });
    await client.connect();
    const db = drizzle(client);
    const result = await db.select().from(...);

    // Clean up the client, ensuring we don't kill the worker before that is completed.
    ctx.waitUntil(client.end());
    return new Response(now);
  }
}`;break;
case "PGlite":TEMPLATE=`import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

// In-memory Postgres
const client = new PGlite();
export const db = drizzle(client);
`;
break;
case "Vercel Postgres":TEMPLATE = `import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql)`;
break;
case "Supabase":TEMPLATE = `import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString)
export const db = drizzle(client);
`;break;
case "AWS Data API":TEMPLATE = `import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import { fromIni } from '@aws-sdk/credential-providers';

const rdsClient = new RDSDataClient({
    credentials: fromIni({ profile: process.env['PROFILE'] }),
    region: 'us-east-1',
});

export const db = drizzle(rdsClient, {
  database: process.env['DATABASE']!,
  secretArn: process.env['SECRET_ARN']!,
  resourceArn: process.env['RESOURCE_ARN']!,
});
`;break;
case "HTTP Proxy":TEMPLATE = `import { drizzle } from 'drizzle-orm/pg-proxy';

const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from pg proxy server: ', e.response.data)
    return { rows: [] };
  }
});`;break;
                default:
                    console.log("Something went wrong")
                    break;
            }
            break;
    
        case "MySQL":
            switch (provider) {
                case "planetScale":TEMPLATE=`import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

const client = new Client({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(client);`
                    
                    break;
            
                case "Mysql2": TEMPLATE = `import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "host",
  user: "user",
  database: "database",
  ...
});

export const db = drizzle(connection);`
                    
                    break;
            
                case "HTTP proxy": TEMPLATE = `import { drizzle } from 'drizzle-orm/mysql-proxy';

export const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from mysql proxy server: ', e.response.data)
    return { rows: [] };
  }
});`
                    
                    break;
            
                case "TiDB Serverless": TEMPLATE = `import { connect } from '@tidbcloud/serverless';
import { drizzle } from 'drizzle-orm/tidb-serverless';

const client = connect({ url: '...' });
export const db = drizzle(client);`
                    
                    break;
            
                default:
                    console.log("Something went wrong.")
                    break;
            }
            break;
    
        case "SQLite":
            switch (provider) {
                case "Turso": TEMPLATE = `import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: 'DATABASE_URL', authToken: 'DATABASE_AUTH_TOKEN' });

export const db = drizzle(client);
`

                    break;
                case "Cloudflare D1": TEMPLATE = `import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  <BINDING_NAME>: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.<BINDING_NAME>);
    const result = await db.select().from(users).all()
    return Response.json(result);
  },
};`
                    
                    break;
                case "Bun sqlite": TEMPLATE = `import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);
`
                    
                    break;
                case "React Native SQLite": TEMPLATE = `import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
const expo = openDatabaseSync("db.db");
export const db = drizzle(expo);`
                    
                    break;
                case "Expo SQLite": TEMPLATE = `import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
const expo = openDatabaseSync("db.db");
export const db = drizzle(expo);`
                    
                    break;
                case "better-sqlite3": TEMPLATE = `import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);`
                    
                    break;
                case "HTTP Proxy": TEMPLATE = `import { drizzle } from 'drizzle-orm/sqlite-proxy';

export const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from sqlite proxy server: ', e.response.data)
    return { rows: [] };
  }
});`
                    
                    break;
            
                default:
                    break;
            }
            break;
    
        default:
            break;
    }
    return TEMPLATE
}