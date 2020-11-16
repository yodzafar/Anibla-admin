import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import * as Yup from "yup";
import genre from "../../Service/genre";
import {useDispatch} from "react-redux";
import {getGenreList} from "../../Models/genre";
import {hideModal} from "../../Models/app";
import {showSnackbar} from "../../Models/app/actions";
import {URL_TITLE} from "../../Constants/url";

export const useGenreForm = (props) => {
    const {id} = props
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [initialValues, setInitialValues] = useState({
        nameuz: '',
        nameru: ''
    })

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required('Maydon to\'ldirilshi shart'),
        nameru: Yup.string().required('Maydon to\'ldirilshi shart')
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: ({nameuz, nameru}, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const data = {
                nameuz,
                nameru,
            }

            if (id) {
                genre.updateGenre(id, data)
                    .then(res => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${URL_TITLE.GENRE.TITLE} muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getGenreList())
                            dispatch(hideModal())
                            resetForm()
                        }
                    }).finally(() => setSubmitting(false))
                    .catch(() => {
                        const payload = {
                            open: true,
                            variant: 'error',
                            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                        }
                        dispatch(showSnackbar(payload))
                        setSubmitting(false)
                    })
            } else {
                genre.createGenre(data)
                    .then(res => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${URL_TITLE.GENRE.TITLE} muvaffaqiyatli qo'shildi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getGenreList())
                            resetForm()
                        }
                    }).finally(() => setSubmitting(false))
                    .catch(() => {
                        const payload = {
                            open: true,
                            variant: 'error',
                            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                        }
                        dispatch(showSnackbar(payload))
                        setSubmitting(false)
                    })
            }
        }
    })

    const getGenreInfo = useCallback(() => {
        if (id) {
            genre.getGenre(id)
                .then(res => {
                    if (res.success) {
                        setInitialValues({
                            nameuz: res.data.nameuz,
                            nameru: res.data.nameru
                        })
                    }
                }).catch(e => {
                console.log(e);
            })
        }
    }, [id])

    useEffect(() => {
        const errData = Object.keys(formik.errors)
        const tmp = {}
        for (let i = 0; i < errData.length; i++) {
            if (formik.touched[errData[i]]) {
                const key = errData[i].split('_')[1]
                tmp[key] = true
            }
        }
        setError(tmp);
    }, [formik.errors, formik.touched])

    useEffect(() => {
        getGenreInfo()
    }, [getGenreInfo])

    return {
        formik,
        error
    }
}