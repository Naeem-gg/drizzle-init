export const schemaContent = (db,provider)=>{
    if(db==='PostgreSQL')
return `import { date, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: varchar('id',{length:20}).notNull().primaryKey(),
    username:varchar('username',{length:50}).notNull(),
    password:varchar('password',{length:256}).notNull(),
    createdAt:date('created_at').defaultNow()
});
`
if(db==='MySQL')return`import { date, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
    id: varchar('id',{length:20}).notNull().primaryKey(),
    username:varchar('username',{length:50}).notNull(),
    password:varchar('password',{length:256}).notNull(),
    createdAt:date('created_at').default(new Date())
});`
if(db==='SQLite')return`import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: text('id',{length:20}).notNull().primaryKey(),
    username:text('username',{length:50}).notNull(),
    password:text('password',{length:256}).notNull()
});`
}