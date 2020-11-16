import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from 'yup'
import annotation from "../../Service/annotation";
import {useDispatch} from "react-redux";
import {getAnnotationList} from "../../Models/annotation";
import {showSnackbar} from "../../Models/app/actions";
import {URL_TITLE} from "../../Constants/url";

export const useAnnotationForm = () => {
    const [error, setError] = useState({})
    const dispatch = useDispatch()

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
        nameru: Yup.string().required("Maydon to'ldirilishi shart"),
        descriptionuz: Yup.string().required("Maydon to'ldirilishi shart"),
        descriptionru: Yup.string().required("Maydon to'ldirilishi shart"),
        video: Yup.string().required("Maydon to'ldirilishi shart")
    })

    const formik = useFormik({
        initialValues: {
            status: false,
            nameuz: '',
            nameru: '',
            descriptionuz: '',
            descriptionru: '',
            video: ''
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const data = {
                nameuz: values.nameuz,
                nameru: values.nameru,
                descriptionuz: values.descriptionuz,
                descriptionru: values.descriptionru,
                video: values.video,
                status: values.status
            }

            annotation.createAnnotation(data)
                .then((res) => {
                    if(res.success) {
                        const payload = {
                            open: true,
                            variant: 'success',
                            message: `${URL_TITLE.ANNOTATION.TITLE} muvaffaqiyatli qo'shildi`
                        }
                        dispatch(showSnackbar(payload))
                        resetForm()
                        dispatch(getAnnotationList())
                    }
                })
                .finally(() => setSubmitting(false))
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
    })

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.descriptionru && !!formik.errors.descriptionru)
        || (formik.touched.descriptionuz && !!formik.errors.descriptionuz)
        || (formik.touched.video && !!formik.errors.video)

    useEffect(() => {
        const errData = Object.keys(formik.errors)
        const tmp = {}
        for (let i = 0; i < errData.length; i++) {
            if (formik.touched[errData[i]]) {
                if (errData[i].indexOf('uz') !== -1) {
                    tmp.uz = true
                }

                if (errData[i].indexOf('ru') !== -1) {
                    tmp.ru = true
                }
            }
        }
        setError(tmp);
    }, [formik.errors, formik.touched])

    return {
        formik,
        submitDisabled,
        error
    }
}