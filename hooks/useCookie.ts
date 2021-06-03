import { useState, useEffect } from "react"
import Cookies from "js-cookie";

/**
 * @param name of Cookie
 */
export function useCookie(name: string): [string, (newValue: string) => void] {
    const Cookie = Cookies.get(name) || ""
    const [value, setValue] = useState("")
    useEffect(() => setValue(Cookie), [])

    const set = (newValue: string) => {
        Cookies.set(name, newValue, {
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict"
        })
        setValue(newValue)
    }

    return [value, set]
}