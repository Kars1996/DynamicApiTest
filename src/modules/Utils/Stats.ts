import { sql } from "@vercel/postgres";

let successfulRequests: number = 2497;
let failedRequests: number = 9;

export async function successStats() {
    successfulRequests++;
    await updateSuccessfulRequestsInDatabase(successfulRequests);
}

export async function failedStats() {
    failedRequests++;
    await updateFailedRequestsInDatabase(failedRequests);
}

export async function getStats() {
    const { rows } = await sql`SELECT * FROM stats LIMIT 1`;
    return rows[0];
}
async function updateSuccessfulRequestsInDatabase(value: number) {
    await sql`UPDATE stats SET successfulRequests = ${value} WHERE id = 1`;
}

async function updateFailedRequestsInDatabase(value: number) {
    await sql`UPDATE stats SET failedRequests = ${value} WHERE id = 1`;
}
