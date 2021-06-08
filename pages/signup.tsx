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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        useApi("user/signup", { username, password }).then(i => {

            if (i.type == "success") return router.replace("/login", "/");
            console.log(i);

        })
    }

    return (
        <>
            <Header noMenu />
            <main id="signup">
                <form onSubmit={handleSubmit}>
                    <h2>signup</h2>
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
                    <Link href="/login" as="/">
                        <button className="btn">go to login</button>
                    </Link>
                    <button className="btn" onClick={handleSubmit}>
                        signup
                    </button>
                </form>
            </main>
        </>
    )
}