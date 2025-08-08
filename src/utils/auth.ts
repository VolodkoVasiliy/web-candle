import { betterAuth } from "better-auth";
import Database from 'better-sqlite3'
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { db, db2 } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { account, session, user, verification } from '../../auth-schema'


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
        schema: {
            verification,
            user,
            session,
            account
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin(),
        nextCookies()
    ]
})

