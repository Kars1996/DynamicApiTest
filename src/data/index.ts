import type { quoteProp } from "@/modules/Types/quote";
import { quotesConst } from "./quotes";

export const quoteData = quotesConst.map((quote: quoteProp, index: number) => {
    return {id: index, ...quote}
})