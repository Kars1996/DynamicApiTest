import { sql } from "@vercel/postgres";

let successfulRequests: number = 0;
let failedRequests: number = 0;

export async function successStats() {
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
    const { rowCount } = await sql`SELECT EXISTS(SELECT 1 FROM pg_tables WHERE tablename='stats')`;
    if (!rowCount) {
        await sql`
            CREATE TABLE IF NOT EXISTS stats (
                id SERIAL PRIMARY KEY,
                successfulRequests INTEGER DEFAULT 0,
                failedRequests INTEGER DEFAULT 0
            )`;
    }

    let updateQuery = sql`UPDATE stats SET `;
    switch (statType) {
        case 'successfulRequests':
            updateQuery = updateQuery.append(sql`${sql.identifier('successfulRequests')} = ${value}`);
            break;
        case 'failedRequests':
            updateQuery = updateQuery.append(sql`${sql.identifier('failedRequests')} = ${value}`);
            break;
        default:
            throw new Error(`Invalid statType: ${statType}`);
    }
    updateQuery = updateQuery.append(sql` WHERE id = 1`);
    await updateQuery;
}
