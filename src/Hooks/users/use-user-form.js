import {useFormik} from "formik";
import {useEffect, useState} from "react";
import users from "../../Service/users";
import * as Yup from 'yup'

export const useUserForm = (id) => {
    const [initialValues, setInitialValues] = useState({
        balance: '',
        email: "",
        name: "",
        role: "",
        status: "",
    })

    const validationSchema = new Yup.object().shape({
        balance: Yup.string().required("Maydon to'ldirilishi shart"),
        email: Yup.string().required("Maydon to'ldirilishi shart").email('Xato elektron pochta'),
        name: Yup.string().required("Maydon to'ldirilishi shart"),
        role: Yup.string().required("Maydon to'ldirilishi shart"),
        status: Yup.string().required("Maydon to'ldirilishi shart"),
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            setSubmitting(true)

            users.updateUser({id, data: {...values}})
                .then((res) => {
                    console.log(res);
                })
        }
    })

    useEffect(() => {
        users.getUser(id)
            .then((res) => {
                const data = res.data
                const newData = {
                    balance: data.balance,
                    email: data.email,
                    name: data.name,
                    role: data.role,
                    status: data.status,
                }

                setInitialValues(newData)
            })
    }, [id])

    return {formik}
}