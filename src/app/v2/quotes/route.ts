import { NextRequest } from "next/server";
import { quoteData } from "@/data";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const random = searchParams.get("random")?.toLowerCase();
    const limit = searchParams.get("limit")?.toLowerCase();
    const author = searchParams.get("author")?.toLowerCase();
    const search = searchParams.get("search")?.toLowerCase();
    const stats = searchParams.get("stats")?.toLowerCase();

    let response;

    if (!random && !limit && !author && !search && !stats) {
        response = quoteData;
    }
    else if (random === "true") {
        const randomIndex = Math.floor(Math.random() * quoteData.length);
        response = quoteData[randomIndex];
    }
    else if (limit) {
        const numLimit = parseInt(limit);
        response = quoteData.slice(0, numLimit);
    }
    else if (author) {
        response = quoteData.filter(quote => quote.author.toLowerCase() === author.toLowerCase());
        if (response.length === 0) {
            response = { error: "Seach query not found" }
        } 
    }
    else if (search) {
        response = quoteData.filter(quote => quote.quote.toLowerCase().includes(search.toLowerCase()));
        if (response.length === 0) {
            response = { error: "Seach query not found" }
        }
    }
    else if (stats === "true") {
        response = { stats: { quotes: quoteData.length } };
    }
    else {
        response = { error: "Invalid query parameters" };
    }

    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
