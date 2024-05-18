import { failedStats, getStats, succesStats } from "@/modules/Utils/Stats";
import { type NextRequest } from "next/server";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

interface ResponseProp {
    response: any;
    status?: number;
}

const stats = getStats()
const key = process.env.TOKEN || "admin"

const Data: ResponseProp = {
    response: "Unatuhorised Request",
    status: 200,
};

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("key");
    
    if (query?.toLowerCase() === key) {
        succesStats()
        return new Response(
            JSON.stringify({ response: stats, status: 200 }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    failedStats()
    return new Response(JSON.stringify(Data), {
        
        headers: {
            "Content-Type": "application/json",
        },
    });
}