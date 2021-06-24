import { ChangeEvent, ReactNode } from "react"

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    value: string | number
    label?: string

    required?: true
    placeholder?: string
    type?: string
    autoFocus?: true
    noLabel?: true

    NumberMin?: number
    NumberMax?: number
    minLength?: number
    maxLength?: number

    children?: ReactNode
}

export function InputField(props: Props) {

    return (
        <div className="inputField">
            {!props.noLabel && <label>{props.label||props.name}</label>}
            <input
                key={props.name.replace(/\s/g, '')}
                autoFocus={props.autoFocus}
                name={props.name.replace(/\s/g, '')}
                value={props.value}
                type={props.type || "text"}
                onChange={e => { props.onChange(e) }}
                placeholder={props.placeholder}
                min={props.NumberMin}
                max={props.NumberMax}
                minLength={props.minLength}
                maxLength={props.maxLength}
                required={props.required}
            />
            {props.children}
        </div>
    )
}