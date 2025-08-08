import { betterAuth } from "better-auth";
import Database from 'better-sqlite3'
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin(),
        nextCookies()
    ]
})

