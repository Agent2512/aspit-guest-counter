import { decode } from "jsonwebtoken";
import { useEffect } from "react";
import { userToken } from "../interfaces";
import { useApi } from "./useApi";
import { useCookie } from "./useCookie";

export async function useAuth() {
    const [val, setVal] = useCookie("jwt")
    const user = JSON.parse("[]")
    return await useApi("user/auth", user).then((i) => {
        if (i.type == "error") {
            return false
        }
        else if (i.type == "success") {
            const token:string = i.jwt
            setVal(i.jwt)
            return token
            // return decode(token) as userToken
        }
        return false
    })
}