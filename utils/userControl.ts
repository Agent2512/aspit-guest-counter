import { Iquery } from "../interfaces";
import { query } from "./dbConnect";

interface user extends Iquery {
    id: number
    username: string
    password: string
    isAdmin: number
}

export class userControl {
    async getAllUsers() {
        var data = await query("SELECT * FROM `users`") as user[]
        var user1 = Object.keys(data[0]).map(key => data[0][key])
        console.log(user1);
        
        

        return data
    }
}