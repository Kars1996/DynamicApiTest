import { sql } from "@vercel/postgres";

export async function createDb() {
    try {
        const { rowCount } =
            await sql`SELECT EXISTS(SELECT 1 FROM pg_tables WHERE tablename='stats')`;
        if (!rowCount) {
            await sql`
                CREATE TABLE stats (
                    id SERIAL PRIMARY KEY,
                    successfulRequests INTEGER DEFAULT 0,
                    failedRequests INTEGER DEFAULT 0
                )
            `;
            return true;
        }
        return true;
    } catch (error) {
        return false;
    }
}
