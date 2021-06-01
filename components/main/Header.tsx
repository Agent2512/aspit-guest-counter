import { IoMenu } from "react-icons/io5"
import { Logo } from "../Logo"
import MenuToggler from "./menu"

interface Props {
    noMenu?: true
}

export default function Header(props: Props) {
    return (
        <header className="mainHeader">
            {!props.noMenu && <MenuToggler />}
            <Logo />
            <h1>gæste tæller</h1>
        </header>
    )
}