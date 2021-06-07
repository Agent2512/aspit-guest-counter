import { Iapi } from "../interfaces";
var env = process.env.NODE_ENV || 'development'
const env_bool = env == "production" && true

/**
 *  @param path /api/???
 */
export async function useApi(path: string, body: object) {
    return await fetch(`http://localhost${env_bool?"":":80"}/aspit-guest-counter/api/${path}.php`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
    }).then(res => res.json()).then((data: Iapi) => data)
}