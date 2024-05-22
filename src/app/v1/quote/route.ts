import { quoteData } from "@/data/quotes";
import { successStats } from "@/modules/Utils/Stats";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const random =  Math.floor(Math.random() * quoteData.length);
    const quote = quoteData[random]
    successStats()
    return new Response(JSON.stringify(quote), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}