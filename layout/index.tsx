import { ReactNode } from "react"

interface Props {
    children: ReactNode
    top?: string|"auto"
    bottom?: string|"auto"
    left?: string|"auto"
    right?: string|"auto"
    zIndex?: number|"auto"
    className?:string
}

export function Fixed(props: Props) {

    return (
        <div id="fixed" className={props.className} style={{ top: props.top, left: props.left, right: props.right, bottom: props.bottom, zIndex: props.zIndex }}>
            {props.children}
        </div>
    )
}
export function Absolute(props: Props) {

    return (
        <div id="absolute" className={props.className} style={{ top: props.top, left: props.left, right: props.right, bottom: props.bottom, zIndex: props.zIndex }}>
            {props.children}
        </div>
    )
}