import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react"

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    value: string | number
    placeholder?: string
    type?: string
    autoFocus?: true
    noLabel?: true
    children?: ReactNode
    min?: number
    max?: number

}

export function InputField(props: Props) {

    return (
        <div className="inputField">
            {!props.noLabel && <label>{props.name}</label>}
            <input
                key={props.name.replace(/\s/g, '')}
                autoFocus={props.autoFocus}
                name={props.name.replace(/\s/g, '')}
                value={props.value}
                type={props.type || "text"}
                onChange={e => { props.onChange(e) }}
                placeholder={props.placeholder}
                min={props.min}
                max={props.max}
            />
            {props.children}
        </div>
    )
}