import { useState } from "react";
import Link from 'next/link'
import { IoClose, IoMenu } from "react-icons/io5";

export default function MenuToggler() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <button onClick={() => setShowMenu(!showMenu)} className="mainMenu-toggler">
                {!showMenu ? <IoMenu /> : <IoClose />}
            </button>
            {showMenu && <Menu />}
        </>
    )
}

function Menu() {
    interface links {
        href: string;
        text: string;
        as?: string;
    }

    const links:links[] = [
        { href: "/", text: "link 1" },
        { href: "/", text: "link 2" },
        { href: "/", text: "link 3" },
        { href: "/", text: "link 4" },
        // { href: "/api/logout", text: "logOut", as:"logout" },
    ]

    return (
        <div className="mainMenu-wrapper">
            <section className="mainMenu">
                {links.map((i, index) =>
                    <Link key={index} href={i.href} as={i.as}>
                        <a>{i.text}</a>
                    </Link>)}

            </section>
        </div>
    )
}