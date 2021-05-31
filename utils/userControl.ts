import squel, { BaseBuilder } from "squel";
import { query } from "./dbConnect";

interface user {
    id: number
    username: string
    password: string
    isAdmin: number
}
export class userControl {
    query = (q: BaseBuilder) => query<user>(q);
    
    

    async getUser(input:string|number, type:"id"|"username") {
        if (type == "id") {
            const q = squel.select().from("users").where(`id = ${input}`)
            console.log(q.toString());
            
            return await this.query(q)
        }
    }
}