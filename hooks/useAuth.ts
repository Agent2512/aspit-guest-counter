import { useEffect } from "react";
import { userToken } from "../interfaces";
import { useApi } from "./useApi";
import { useCookie } from "./useCookie";

export async function useAuth() {
    const [val, setVal] = useCookie("jwt")
    const user = JSON.parse("[]")
    return await useApi("user/auth", user).then((i) => {
        if (i.type == "error") {
            location.assign("/login")
        }
        else if (i.type == "success") {
            const user:userToken = i.jwt
            setVal(JSON.stringify(user))
            return user
        }
    })
}