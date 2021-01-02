import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import * as Yup from 'yup'
import {URL_TITLE} from "../../Constants/url";
import {hideModal, showSnackbar} from "../../Models/app/actions";
import {getPriceList} from "../../Models/price";
import {useDispatch, useSelector} from "react-redux";
import price from "../../Service/price";

export const usePriceForm = ({id}) => {
    const dispatch = useDispatch()
    const {data} = useSelector(({price}) => price)

    const [initialValues, setInitialValues] = useState({
        name: '',
        amount: '',
        type: '1'
    })

    const [priceOptions] = useState([
        {
            id: '1',
            name: "Bir oylik"
        },
        {
            id: '3',
            name: "Uch oylik"
        },
        {
            id: '6',
            name: "Olti oylik"
        },
        {
            id: '10',
            name: "Bir Yillik"
        }

    ])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Maydon to\'ldirilshi shart'),
        amount: Yup.string().required('Maydon to\'ldirilshi shart'),
        type: Yup.string().required('Maydon to\'ldirilshi shart'),
    })

    const formik = useFormik(({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: ({name, amount, type}, {setSubmitting, resetForm}) => {
            const data = {
                name,
                amount: Number(amount),
                type
            }
            setSubmitting(true)

            if (id) {
                price.updatePrice({id, data})
                    .then(() => {
                        const payload = {
                            open: true,
                            variant: 'success',
                            message: `${URL_TITLE.PRICE.TITLE} muvaffaqiyatli tahrirlandi`
                        }
                        dispatch(showSnackbar(payload))
                        dispatch(getPriceList())
                        dispatch(hideModal())
                        resetForm()
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
                price.addPrice(data)
                    .then(() => {
                        const payload = {
                            open: true,
                            variant: 'success',
                            message: `${URL_TITLE.PRICE.TITLE} muvaffaqiyatli qo'shildi`
                        }
                        dispatch(showSnackbar(payload))
                        dispatch(getPriceList())
                        resetForm()
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
    }))

    const getPrice = useCallback(() => {
        if (id) {
            const priceData = data.find(item => item._id === id)
            setInitialValues({
                amount: priceData.amount,
                name: priceData.name,
                type: priceData.type
            })
        }
    }, [id, data])

    useEffect(() => {
        getPrice()
    }, [getPrice])

    return {
        formik,
        priceOptions
    }
}