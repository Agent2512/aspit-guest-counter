import Cookies from "js-cookie";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useApi } from "./useApi";

export function useAuth(
    router: NextRouter,
    ChangeLoadingState: Dispatch<SetStateAction<boolean>>
    ) {
    useEffect(() => {
        const token = Cookies.get("jwt")
        useApi("user/auth", { token }).then(i => {
            if (i.type == "error") router.replace("/login", "/")
            ChangeLoadingState(false)
        })
    }, [])
}