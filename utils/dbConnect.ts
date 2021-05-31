import mysql from "serverless-mysql";
import { BaseBuilder } from "squel";

export const dbConnect = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: Number(process.env.MYSQL_PORT),

    },

    // onConnect: () => console.log("db connection")

})

export async function query<t>(q: BaseBuilder) {
    try {
        const results = await dbConnect.query(q.toString())
        await dbConnect.end()
        return JSON.parse(JSON.stringify(results)) as t[]
    } catch (e) {
        return false
    }
}