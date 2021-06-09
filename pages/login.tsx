import { ChangeEvent, FormEvent, useState } from "react";
import Link from 'next/link'
import { InputField } from "../components/InputField";
import Header from "../components/main/Header";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";

export default function page() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        name == "username" && setUsername(value)
        name == "password" && setPassword(value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        useApi("user/login", { username, password }).then(i => {
            
            // if (i.type =="success") return router.replace("/");
            console.log(i);
            
        })
    }

    return (
        <>
            <Header noMenu />
            <main id="login">
                <form onSubmit={handleSubmit}>
                    <h2>login</h2>
                    <InputField
                        onChange={handleChange}
                        name="username"
                        value={username}
                        autoFocus
                        placeholder="username"
                    />
                    <InputField
                        onChange={handleChange}
                        name="password"
                        value={password}
                        placeholder="password"
                        type="password"
                    />
                    <button className="btn-2">
                        login
                    </button>
                    <Link href="/signup" as="/">
                        <button className="btn-1">go to signup</button>
                    </Link>
                </form>
            </main>
        </>
    )
}