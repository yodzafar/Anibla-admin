import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getProductInfo } from '../../Models/product'
import product from '../../Service/product'
import { BASE_URL } from '../../Constants/url'
import { hideModal } from '../../Models/app'
import { imageExtValidate } from '../../utils/ext-validate'
import {imgObgj, readFileAsDataURL} from "../../utils/imageSize";
import {showSnackbar} from "../../Models/app/actions";

export const useSeasonForm = ({ filmId, id }) => {
    const dispatch = useDispatch()
    const productInfo = useSelector(({ product }) => product.productInfo)
    const [error, setError] = useState({})
    const [initialValues, setInitialValues] = useState({
        kinoId: filmId,
        nameuz: '',
        nameru: '',
        descriptionuz: '',
        descriptionru: '',
        year: '',
        num: '',
        image: null
    })

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required('Maydon to\'ldirilshi shart'),
        nameru: Yup.string().required('Maydon to\'ldirilshi shart'),
        descriptionuz: Yup.string().required('Maydon to\'ldirilshi shart'),
        descriptionru: Yup.string().required('Maydon to\'ldirilshi shart'),
        kinoId: Yup.string().required('Maydon to\'ldirilshi shart'),
        year: Yup.string().required('Maydon to\'ldirilshi shart'),
        num: Yup.string().required('Maydon to\'ldirilshi shart'),
        image: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
            .test('fileSize', "Muqova rasmi width/height 0.7dan katta 0.8 kichik bo'lishi talab etiladi",
                async (file) => {
                    if (file && typeof file !== "string") {
                        const base64Url = await readFileAsDataURL(file)
                        const image = await imgObgj(base64Url)
                        return (image.naturalWidth / image.naturalHeight) >= 0.7
                            && (image.naturalWidth / image.naturalHeight) <= 0.8
                    }
                    return true
                }).required("Maydon to'ldirilishi shart")

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)

            if (!id) {
                const data = new FormData()
                data.append('nameuz', values.nameuz)
                data.append('nameru', values.nameru)
                data.append('descriptionuz', values.descriptionuz)
                data.append('descriptionru', values.descriptionru)
                data.append('kinoId', values.kinoId)
                data.append('num', values.num)
                data.append('year', values.year)
                data.append('image', values.image)
                product.createSeason(data)
                    .then((res) => {
                        if (res.success) {
                            resetForm()
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli qo'shildi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getProductInfo(filmId))
                        }
                    }).finally(() => setSubmitting(false))
                    .catch(() => {
                        setSubmitting(false)
                        const payload = {
                            open: true,
                            variant: 'error',
                            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                        }
                        dispatch(showSnackbar(payload))
                    })
            } else {
                const data = {
                    nameuz: values.nameuz,
                    nameru: values.nameru,
                    descriptionuz: values.descriptionuz,
                    descriptionru: values.descriptionru,
                    kinoId: values.kinoId,
                    num: values.num,
                    year: values.year
                }
                product.updateSeason({ id, data })
                    .then((res) => {
                        if (res.success) {
                            resetForm()
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getProductInfo(filmId))
                            dispatch(hideModal())
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

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.descriptionru && !!formik.errors.descriptionru)
        || (formik.touched.descriptionuz && !!formik.errors.descriptionuz)
        || (formik.touched.year && !!formik.errors.year)
        || (formik.touched.image && !!formik.errors.image)
        || (formik.touched.num && !!formik.errors.num)

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

    const getSeason = useCallback(() => {
        if (id) {
            const season = productInfo.season.find((item) => item._id === id)
            setInitialValues({
                kinoId: filmId,
                nameuz: season.name.uz,
                nameru: season.name.ru,
                descriptionuz: season.description.uz,
                descriptionru: season.description.ru,
                year: season.year,
                num: season.num,
                image: `${BASE_URL}/${season.image}`
            })
        }
    }, [id, productInfo, filmId])

    useEffect(() => {
        getSeason()
    }, [getSeason])

    return {
        formik,
        submitDisabled,
        error
    }
}
