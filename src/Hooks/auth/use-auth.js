import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import auth from '../../Service/auth';
import {login} from '../../Models/auth';
import {useCallback, useState} from "react";
import axios from 'axios'

const API_SERVICE = process.env.REACT_APP_SERVICE_URL

export const useAuth = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    const validationSchema = new Yup.object().shape({
        email: Yup.string().required('Maydon to\'ldirilishi shart').email('Xato elektron pochta'),
        password: Yup.string().required('Maydon to\'ldirilishi shart')
    })

    const getUserInfo = useCallback((token) => {
        axios.get(`${API_SERVICE}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.data.role && (res.data.data.role !== 'admin' || res.data.data.role !== 'publisher')) {
                    dispatch(login(token))
                }else {
                    setError('Tizimga kirishga ruxsat berilmadi')
                }
            })

    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: ((values, {setSubmitting}) => {
            setSubmitting(true)
            auth.getToken(values)
                .then((res) => {
                    if (res.success) {
                        getUserInfo(res.token)
                    }
                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    setSubmitting(false)
                })
        })
    })

    return {
        formik,
        error
    }
}
