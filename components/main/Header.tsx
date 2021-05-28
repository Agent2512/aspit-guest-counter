import { IoMenu } from "react-icons/io5"
import { Logo } from "../logo"
export default function Header() {
    return (
        <header id="mainHeader">
            <button>
                <IoMenu />
            </button>
            <Logo />
            <h1>gæste tæller</h1>
        </header>
    )
}