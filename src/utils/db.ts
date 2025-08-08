import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql/node';

export const db = drizzle({
    connection: {
        url: process.env.TURSO_DATABASE_URL || '',
        authToken: process.env.TURSO_AUTH_TOKEN
    }
});

const client = createClient({ url: process.env.TURSO_DATABASE_URL || '', authToken: process.env.TURSO_AUTH_TOKEN });
export const db2 = drizzle(client);