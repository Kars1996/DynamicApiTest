import type { gifProp } from "@/modules/Types/gif"
import { gifConst } from "./gifs"

export const gifData = gifConst.map((gif: gifProp, index: number) => {
    return {id: index, ...gif}
})