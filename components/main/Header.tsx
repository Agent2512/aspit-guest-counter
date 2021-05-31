import { IoMenu } from "react-icons/io5"
import { Logo } from "../Logo"
import MenuToggler from "./menu"
export default function Header() {
    return (
        <header className="mainHeader">
            <MenuToggler />
            <Logo />
            <h1>gæste tæller</h1>
        </header>
    )
}