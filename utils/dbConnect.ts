import mysql from "serverless-mysql";
import { BaseBuilder } from "squel";

const MYSQL_HOST = process.env.MYSQL_HOST || process.exit(1)
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || process.exit(1)
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || process.exit(1)
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || process.exit(1)
const MYSQL_PORT = process.env.MYSQL_PORT || process.exit(1)

export const dbConnect = mysql({
    config: {
        host: MYSQL_HOST,
        database: MYSQL_DATABASE,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        port: Number(MYSQL_PORT),

    },

    // onConnect: () => console.log("db connection")

})

export async function query<T>(q: BaseBuilder) {
    try {
        const results = await dbConnect.query(q.toString())
        await dbConnect.end()
        return JSON.parse(JSON.stringify(results)) as T
    } catch (e) {
        return false
    }
}