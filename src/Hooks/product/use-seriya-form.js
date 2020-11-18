/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { BASE_URL } from '../../Constants/url'
import { getProductInfo } from '../../Models/product'
import product from '../../Service/product'
import {imageExtValidate} from "../../utils/ext-validate";
import {imgObgj, readFileAsDataURL} from "../../utils/imageSize";
import {hideModal, showSnackbar} from "../../Models/app/actions";

export const useSeriyaForm = ({ filmId, id, seasonId }) => {
    const [initialValues, setInitialValues] = useState({
        nameuz: '',
        nameru: '',
        video: '',
        kinoId: filmId,
        season: seasonId,
        length: '',
        screens: [],
        cover: null
    })
    const productInfo = useSelector(({ product }) => product.productInfo)
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
        nameru: Yup.string().required("Maydon to'ldirilishi shart"),
        video: Yup.string().required("Maydon to'ldirilishi shart").test('url_test', 'URL xato kiritilgan', (video) => {
            const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            const without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
            return (regex.test(video) || without_regex.test(video))
        }),
        kinoId: Yup.string().required("Maydon to'ldirilishi shart"),
        season: Yup.string().required("Maydon to'ldirilishi shart"),
        cover: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
            .test('coverImageSize', "Muqova rasmi width/height 0.7dan katta 0.8 kichik bo'lishi talab etiladi",
                async (file) => {
                    if (file && typeof file !== "string") {
                        const base64Url = await readFileAsDataURL(file)
                        const image = await imgObgj(base64Url)
                        return (image.naturalWidth / image.naturalHeight) >= 0.7
                            && (image.naturalWidth / image.naturalHeight) <= 0.8
                    }
                    return true
                }).required("Maydon to'ldirilishi shart"),
        screens: Yup.array().required("Maydon to'ldirilishi shart")
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (files) => {
                let isMatch = true
                for (let i = 0; i < files.length; i++) {
                    if (typeof files[i] === 'string') {
                        break
                    }
                    if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png') {
                        isMatch = false
                        break
                    }
                }

                return files && isMatch
            }),
        length: Yup.string().required("Maydon to'ldirilishi shart")
            .matches(/^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/, "Video davomiyligi 00:00:00 kabi bo'lishi talab qilinadi")
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)

            if (!id) {
                const data = new FormData()
                const images = [values.cover, ...values.screens]
                data.append('nameuz', values.nameuz)
                data.append('nameru', values.nameru)
                data.append('video', values.video)
                data.append('season', values.season)
                data.append('kinoId', values.kinoId)
                data.append('length', values.length)
                for (let i = 0; i < images.length; i++) {
                    data.append('images', images[i])
                }
                product.createSeriya(data)
                    .then((res) => {
                        if (res.success) {
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli qo'shildi`
                            }
                            dispatch(showSnackbar(payload))
                            dispatch(getProductInfo(filmId, seasonId))
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
                const data = {
                    nameuz: values.nameuz,
                    nameru: values.nameru,
                    video: values.video,
                    kino: values.kinoId,
                    season: values.season,
                    length: values.length
                }
                product.updateSeriya({ id, data })
                    .then((res) => {
                        if (res.success) {
                            resetForm()
                            const payload = {
                                open: true,
                                variant: 'success',
                                message: `Seriya muvaffaqiyatli tahrirlandi`
                            }
                            dispatch(hideModal())
                            dispatch(showSnackbar(payload))
                            dispatch(getProductInfo(filmId, seasonId))
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

    const getSeriya = useCallback(() => {
        if (id && seasonId && productInfo.season) {
            const seriya = productInfo.season.find((item) => item._id === seasonId).seriya
                .find((item) => item._id === id)
            if (seriya) {
                setInitialValues({
                    nameuz: seriya.name.uz,
                    nameru: seriya.name.ru,
                    video: seriya.video,
                    kinoId: seriya.kino,
                    season: seriya.season,
                    length: seriya.length,
                    screens: seriya.screens.slice(1).map((item) => `${BASE_URL}/${item}`),
                    cover: seriya.screens.length > 0 && `${BASE_URL}/${seriya.screens[0]}`
                })
            }
        }
    }, [id, seasonId, productInfo.season])

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.video && !!formik.errors.video)
        || (formik.touched.length && !!formik.errors.length)
        || (formik.touched.screens && !!formik.errors.screens)
        || (formik.touched.cover && !!formik.errors.cover)

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
        getSeriya()
    }, [getSeriya])

    return { formik, submitDisabled, error }
}
