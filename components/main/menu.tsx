import { useState } from "react";
import Link from 'next/link'
import { IoClose, IoMenu } from "react-icons/io5";
import { Fixed } from "../../layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface links {
    href: string;
    text: string;
    as?: string;
    onClick?: () => void
}

export default function MenuToggler() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <Fixed top="2rem" left="2.5rem" zIndex={2}>
                <button onClick={() => setShowMenu(!showMenu)} className="mainMenu-toggler">
                    {!showMenu ? <IoMenu /> : <IoClose />}
                </button>
            </Fixed>
            {showMenu && <Menu />}
        </>
    )
}

function Menu() {
    const router = useRouter()

    

    const logout = () => {
        Cookies.remove("jwt")
        router.replace("/login", "/")
    }

    const links: links[] = [
        { href: "/", text: "link 1" },
        { href: "/", text: "link 2" },
        { href: "/", text: "link 3" },
        { href: "/", text: "link 4" },
        { href: "#", text: "logout", onClick:logout},
    ]

    

    return (
        <Fixed className="mainMenu-wrapper">
            <section className="mainMenu">
                {links.map((i, index) =>
                    <Link key={index} href={i.href} as={i.as}>
                        <a onClick={i.onClick} >{i.text}</a>
                    </Link>)}
            </section>
        </Fixed>
    )
}