export const dynamic = "force-dynamic";
import { type NextRequest } from "next/server";
import { gifData } from "@/data/gifs";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

interface ResponseProp {
    response: any;
    status?: number;
}

const key = process.env.LEON_TOKEN || "leon";

const Data: ResponseProp = {
    response: "Unatuhorised Request",
    status: 200,
};

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("key");
    const r1 = gifData.filter((q) => q.category.toLowerCase().includes("kill"));
    const r2 = Math.floor(Math.random() * r1.length);
    const r3 = r1[r2];

    if (query?.toLowerCase() === key) {
        return new Response(JSON.stringify({ response: r3 }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    return new Response(JSON.stringify(Data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
