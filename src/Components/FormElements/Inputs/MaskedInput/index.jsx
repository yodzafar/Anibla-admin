import React, {useState} from 'react'
import InputMask from "react-input-mask";
import {StyledInput} from "../style";
import MaterialInput from '@material-ui/core/Input';

export default () => {
    const [phone, setPhone] = useState('')
    return (
        <InputMask mask="00:00:00" value={phone} onChange={(e) => setPhone(e.target.value)} />
    )
}