export const dbContent = ()=>{
    return `import { client } from 'client'; // import accordingly
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'


const sql = client(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql,{schema});`
}