/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { BASE_URL } from '../../Constants/url'
import { getProductInfo } from '../../Models/product'
import product from '../../Service/product'

export const useSeriyaForm = ({ filmId, id, seasonId }) => {
    const [initialValues, setInitialValues] = useState({
        nameuz: '',
        nameru: '',
        video: '',
        kinoId: filmId,
        season: seasonId,
        length: '',
        images: []
    })
    const productInfo = useSelector(({ product }) => product.productInfo)
    const dispatch = useDispatch()
    const [error, setError] = useState({})

    const validationSchema = new Yup.object().shape({
        nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
        nameru: Yup.string().required("Maydon to'ldirilishi shart"),
        video: Yup.string().required("Maydon to'ldirilishi shart"),
        kinoId: Yup.string().required("Maydon to'ldirilishi shart"),
        season: Yup.string().required("Maydon to'ldirilishi shart"),
        images: Yup.array().required("Maydon to'ldirilishi shart"),
        length: Yup.string().required("Maydon to'ldirilishi shart")
    })

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)

            if (!id) {
                const data = new FormData()
                const { images } = values
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
                            resetForm()
                            dispatch(getProductInfo(filmId, seasonId))
                        }
                    })
                    .finally(() => setSubmitting(false))
                    .catch(() => {
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
                            dispatch(getProductInfo(filmId, seasonId))
                        }
                    })
                    .finally(() => setSubmitting(false))
                    .catch(() => {
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
                    images: seriya.screens.map((item) => `${BASE_URL}/${item}`)
                })
            }
        }
    }, [id, seasonId, productInfo.season])

    const submitDisabled = () => formik.isSubmitting
        || (formik.touched.nameru && !!formik.errors.nameru)
        || (formik.touched.nameuz && !!formik.errors.nameuz)
        || (formik.touched.video && !!formik.errors.video)
        || (formik.touched.length && !!formik.errors.length)

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
