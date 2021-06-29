import { decode } from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import { useRouter } from "next/router"
import { FormEvent } from "react"
import { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from "react"
import { IoAdd, IoClose, IoMenu } from "react-icons/io5"
import { useApi } from "../../hooks/useApi"
import { useCookie } from "../../hooks/useCookie"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { IuserToken } from "../../interfaces"
import { Fixed } from "../../layout"
import { InputField } from "../InputField"

interface Props {

}

export default function AddData(props: Props) {
    const router = useRouter()
    const token = useCookie("jwt")[0]
    const { height, width, size } = useWindowDimensions()
    const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16))
    const [guests, setGuests] = useState(1)
    const [students, setStudents] = useState(0)
    const [zipcode, setZipcode] = useState("")
    const [location, setLocation] = useState("odense")

    const [showMenu, setShowMenu] = useState(false)

    const handlechange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget
        name == "datetime" && setDatetime(value)
        name == "students" && setStudents(Number(value))
        name == "guests" && setGuests(Number(value))
        name == "zipcode" && setZipcode(value)
        name == "location" && setLocation(value)
    }

    const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("test submit");
        const { username }: IuserToken = jwtDecode(token)

        useApi("table/add", {
            location,
            guests,
            students,
            zipcode,
            username,
            datetime,
        }).then(data => {
            if (data.type = "success") {
                router.reload()
            } else {
                console.log(data);
            }
        })
    }



    if (size == "small") {
        return (
            <>
                <button className="addData-toggler" onClick={() => setShowMenu(!showMenu)} >
                    {!showMenu ? <IoAdd /> : <IoClose />}
                </button>
                {showMenu && <Fixed className="addData-wrapper" zIndex={1} >
                    <Normalize handlesubmit={handlesubmit} handlechange={handlechange} values={{ datetime, students, guests, zipcode, location }} />
                </Fixed>}
            </>
        )
    } else showMenu && setShowMenu(false)

    return (
        <div className="addData-wrapper">
            <Normalize handlesubmit={handlesubmit} handlechange={handlechange} values={{ datetime, students, guests, zipcode, location }} />
        </div>
    )
}

function Normalize(props: {
    handlechange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
    handlesubmit: (e: FormEvent<HTMLFormElement>) => void
    values: {
        datetime: number | string
        students: number | string
        guests: number | string
        zipcode: number | string
        location: number | string
    }
}) {
    return (
        <form className="addData" onSubmit={props.handlesubmit} >
            <h2>add data</h2>

            <div className="inputField">
                <label>location</label>
                <select name="location" onChange={props.handlechange} value={props.values.location}>
                    <option value="odense">odense</option>
                    <option value="næstved">næstved</option>
                </select>
            </div>
            <InputField required name="guests" type="number" NumberMin={1} onChange={props.handlechange} value={props.values.guests} />
            <InputField required name="students" type="number" NumberMin={0} onChange={props.handlechange} value={props.values.students} />
            <InputField required name="zipcode" onChange={props.handlechange} minLength={4} maxLength={6} value={props.values.zipcode} />
            <InputField required name="date time" type="datetime-local" onChange={props.handlechange} value={props.values.datetime} />
            <button>Tilføj</button>
        </form>
    )
}
