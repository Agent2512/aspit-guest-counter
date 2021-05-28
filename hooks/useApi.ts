import { Iapi } from "../interfaces";

/**
 *  @param path /api/???
 */
export async function useApi(path:string, body:object) {
    return await fetch(`/api/${path}`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    }).then(res => res.json()).then((data:Iapi) => data)
}