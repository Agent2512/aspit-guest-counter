import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { IoAdd, IoClose, IoMenu } from "react-icons/io5"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { Fixed } from "../../layout"
import { InputField } from "../InputField"

interface Props {

}

export default function AddData(props: Props) {
    const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16))
    const [students, setStudents] = useState(0)
    const [guests, setGuests] = useState(0)
    const [zipcode, setZipcode] = useState("")
    const [location, setLocation] = useState("odense")

    const [showMenu, setShowMenu] = useState(false)

    const handlechange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget
        name == "datetime" && setDatetime(value) 
        name == "students"&& setStudents(Number(value)) 
        name == "guests"&& setGuests(Number(value)) 
        name == "zipcode" && setZipcode(value) 
        name == "location" && setLocation(value) 

    }

    // if (size == "small") {
    //     return (
    //         <>
    //             <button onClick={() => setShowMenu(!showMenu)} >
    //                 {!showMenu ? <IoAdd /> : <IoClose />}
    //             </button>
    //             {showMenu && <Fixed>
    //                 <Normalize />
    //             </Fixed>}
    //         </>
    //     )
    // }

    return <Normalize />

    function Normalize() {
        return (
            <div className="addData-wrapper">
                <form className="addData">
                    <select name="location" onChange={handlechange} value={location}>
                        <option value="odense">odense</option>
                        <option value="næstved">næstved</option>
                    </select>
                    <InputField name="guests" type="number" min={0} onChange={handlechange} value={guests} />
                    <InputField name="students" type="number" min={0} onChange={handlechange} value={students} />
                    <InputField name="zipcode" onChange={handlechange} value={zipcode} />
                    <InputField name="date time" type="datetime-local" onChange={handlechange} value={datetime} />
                </form>
            </div>
        )
    }
}

