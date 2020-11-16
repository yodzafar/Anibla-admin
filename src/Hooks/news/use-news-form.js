import {useFormik} from "formik";
import * as Yup from 'yup'
import {imageExtValidate} from "../../utils/ext-validate";
import {useEffect, useState} from "react";
import news from "../../Service/news";
import {showSnackbar} from "../../Models/app/actions";
import {useDispatch} from "react-redux";
import {getNewsList} from "../../Models/news";
import {URL_TITLE} from "../../Constants/url";

export const useNewsForm = () => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required('Maydon to\'ldirilshi shart'),
        nameru: Yup.string().required('Maydon to\'ldirilshi shart'),
        descriptionuz: Yup.string().required('Maydon to\'ldirilshi shart'),
        descriptionru: Yup.string().required('Maydon to\'ldirilshi shart'),
        image: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : (file.type === 'image/jpeg' || file.type === 'image/png')))
    })

    const formik = useFormik({
        initialValues: {
            nameuz: '',
            nameru: '',
            descriptionuz: '',
            descriptionru: '',
            image: null
        },
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const data = new FormData()

            data.append('nameuz', values.nameuz)
            data.append('nameru', values.nameru)
            data.append('descriptionuz', values.descriptionuz)
            data.append('descriptionru', values.descriptionru)
            data.append('image', values.image)

            news.createNews(data)
                .then(res => {
                    if(res.success) {
                        const payload = {
                            open: true,
                            variant: 'success',
                            message: `${URL_TITLE.NEWS.TITLE} muvaffaqiyatli qo'shildi`
                        }
                        dispatch(showSnackbar(payload))
                        dispatch(getNewsList())
                        resetForm()
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


    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.descriptionru && !!formik.errors.descriptionru)
        || (formik.touched.descriptionuz && !!formik.errors.descriptionuz)

    return {
        formik,
        submitDisabled,
        error
    }
}