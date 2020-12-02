import React from 'react'
import {SelectInput} from "../../../FormElements/Inputs";

const options = [
    {
        id: 'admin',
        name: 'admin'
    },
    {
        id: 'publisher',
        name: 'publisher'
    },
    {
        id: 'user',
        name: 'user'
    }
]

export default ({formik}) => {
    return (
        <SelectInput
            name="role"
            label='Rollar'
            loading={false}
            options={options}
            value={formik.values.role}
            onChange={(e) => formik.setFieldValue('role', e)}
            onBlur={formik.handleBlur}
            error={formik.touched.role && formik.errors.role}
        />
    )
}