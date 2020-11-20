import React, {useState} from 'react'
import InputMask from "react-input-mask";

export default () => {
    const [phone, setPhone] = useState('')
    return (
        <InputMask mask="00:00:00" value={phone} onChange={(e) => setPhone(e.target.value)} />
    )
}