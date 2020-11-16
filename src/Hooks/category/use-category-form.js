/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import category from '../../Service/category';
import {getCategoryList} from '../../Models/category';
import {hideModal} from '../../Models/app';
import {showSnackbar} from "../../Models/app/actions";
import {URL_TITLE} from "../../Constants/url";

export const useCategoryForm = (props) => {
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
                nameru
            }

            if (id) {
                category.updateCategory(id, data)
                    .then((res) => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${URL_TITLE.CATEGORY.TITLE} muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getCategoryList())
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
                category.createCategory(data)
                    .then((res) => {
                        if (res.success) {
                            resetForm()
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `${URL_TITLE.CATEGORY.TITLE} muvaffaqiyatli qo'shildi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getCategoryList())
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

    const getCategoryInfo = useCallback(() => {
        if (id) {
            category.getCategory(id)
                .then((res) => {
                    if (res.success) {
                        setInitialValues({
                            nameuz: res.data.nameuz,
                            nameru: res.data.nameru
                        })
                    }
                }).catch((e) => {
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
        getCategoryInfo()
    }, [getCategoryInfo])

    return {
        formik,
        error
    }
}
