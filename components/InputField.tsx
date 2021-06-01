import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react"

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    value: string|number
    placeholder?: string
    type?: InputHTMLAttributes<HTMLInputElement>["type"]
    children?: ReactNode
    autoFocus?: true
}

export function InputField(props:Props) {

    return (
        <div className="inputField">
            <label>{props.name}</label>
            <input 
                autoFocus={props.autoFocus}
                name={props.name.replace(/\s/g, '')}
                value={props.value}
                type={props.type||"text"} 
                onChange={e => {props.onChange(e)}}
                placeholder={props.placeholder}
                />
            {props.children}
        </div>
    )
}