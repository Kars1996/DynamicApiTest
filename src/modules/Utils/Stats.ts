import { sql } from "@vercel/postgres";

let successfulRequests: number = 2497;
let failedRequests: number = 9;

export async function succesStats() {
    successfulRequests++;
    await updateStatsInDatabase("successfulRequests", successfulRequests);
}

export async function failedStats() {
    failedRequests++;
    await updateStatsInDatabase("failedRequests", failedRequests);
}

export async function getStats() {
    const { rows } = await sql`SELECT * FROM stats LIMIT 1`;
    return rows[0];
}

async function updateStatsInDatabase(statType: string, value: number) {
    const { rowCount } =
        await sql`SELECT EXISTS(SELECT 1 FROM pg_tables WHERE tablename='stats')`;
    if (!rowCount) {
        await sql`
            CREATE TABLE IF NOT EXISTS stats (
                id SERIAL PRIMARY KEY,
                successfulRequests INTEGER DEFAULT 0,
                failedRequests INTEGER DEFAULT 0
            )`;
    }
    await sql`UPDATE stats SET ${statType} = $1 WHERE id = 1`, [value];
}
