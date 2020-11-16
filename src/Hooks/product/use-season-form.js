/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getProductInfo } from '../../Models/product'
import product from '../../Service/product'
import { BASE_URL } from '../../Constants/url'
import { hideModal } from '../../Models/app'
import { imageExtValidate } from '../../utils/ext-validate'

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
                    : (file.type === 'image/jpeg' || file.type === 'image/png')))
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
                            dispatch(getProductInfo(filmId))
                        }
                    }).finally(() => setSubmitting(false))
                    .catch(() => {
                        setSubmitting(false)
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
                            dispatch(getProductInfo(filmId))
                            dispatch(hideModal())
                        }
                    })
                    .finally(() => setSubmitting(false))
                    .catch(() => {
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
