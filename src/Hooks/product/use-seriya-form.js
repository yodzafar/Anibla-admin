import {useFormik} from 'formik'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import product from '../../Service/product'
import {hideModal, showSnackbar} from "../../Models/app";
import {getSeasonInfo} from "../../Models/product";

export const useSeriyaForm = ({filmId, id}) => {
    const [initialValues, setInitialValues] = useState({
        nameuz: '',
        nameru: '',
        video: '',
        season: filmId,
        length: '',
        url: '',
    })

    const series = useSelector(({product}) => product.series)
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
        nameru: Yup.string().required("Maydon to'ldirilishi shart"),
        video: Yup.string().required("Maydon to'ldirilishi shart").test('url_test', 'URL xato kiritilgan', (video) => {
            const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            const without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            return (regex.test(video) || without_regex.test(video))
        }),
        url: Yup.string().required("Maydon to'ldirilishi shart").test('url_test', 'URL xato kiritilgan', (url) => {
            const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            const without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            return (regex.test(url) || without_regex.test(url))
        }),
        season: Yup.string().required("Maydon to'ldirilishi shart"),
        length: Yup.string().required("Maydon to'ldirilishi shart")
            .matches(/^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/, "Video davomiyligi 00:00:00 kabi bo'lishi talab qilinadi")
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const data = {
                nameuz: values.nameuz,
                nameru: values.nameru,
                video: values.video,
                season: values.season,
                length: values.length,
                url: values.url
            }

            if (!id) {
                product.createSeries(data)
                    .then((res) => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli qo'shildi`
                            }

                            dispatch(getSeasonInfo(filmId))
                            dispatch(showSnackbar(payload))
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
            } else {
                product.updateSeries({id, data})
                    .then((res) => {
                        if (res.success) {
                            resetForm()
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(getSeasonInfo(filmId))
                            dispatch(hideModal())
                            dispatch(showSnackbar(payload))
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
        }
    })

    const getSeries = useCallback(() => {
        if (id && filmId && series.length > 0) {
            const data = series.find(item => item._id === id)
            setInitialValues({
                nameuz: data.name.uz,
                nameru: data.name.ru,
                video: data.video,
                season: filmId,
                length: data.length,
                url: data.url
            })
        }
    }, [id, filmId, series])

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.video && !!formik.errors.video)
        || (formik.touched.length && !!formik.errors.length)
        || (formik.touched.url && !!formik.errors.url)

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

    useEffect(() => {
        getSeries()
    }, [getSeries])


    return {formik, submitDisabled, error}
}
