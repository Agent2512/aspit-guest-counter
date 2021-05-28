import squel from "squel";
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
        
    }
}