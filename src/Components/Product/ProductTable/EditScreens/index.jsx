import React, {useCallback} from 'react'
import {Form} from "../../../Form";
import {useFormik} from "formik";
import {ButtonWrapper, Grid, SectionForm} from "../../../GlobalStyles";
import ImageUpload from "../../../ImageIpload";
import Button from "../../../FormElements/Button";
import {hideModal} from "../../../../Models/app";
import {useDispatch} from "react-redux";
import * as Yup from 'yup'
import product from "../../../../Service/product";
import {showSnackbar} from "../../../../Models/app/actions";
import {getProductList, getSeasonList} from "../../../../Models/product";

export const EditScreens = ({id, maxWidth, type}) => {
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        images: Yup.array().required("Maydon to'ldirilishi shart")
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
    })

    const updateSeasonScreens = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        product.updateSeasonScreens({id, data})
            .then(() => {
                const payload = {
                    open: true,
                    variant: 'success',
                    message: "Skrenshotlar muvaffaqiyatli almashtirildi"
                }
                resetForm()
                dispatch(hideModal())
                dispatch(showSnackbar(payload))
                dispatch(getSeasonList())
            })
            .finally(() => setSubmitting(false))
            .catch(() => {
                const payload = {
                    open: true,
                    variant: 'error',
                    message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                }
                setSubmitting(false)
                dispatch(showSnackbar(payload))
            })
    }, [id, dispatch])

    const updateFilmScreens = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        product.updateProductScreens({id, data})
            .then(() => {
                const payload = {
                    open: true,
                    variant: 'success',
                    message: "Skrenshotlar muvaffaqiyatli almashtirildi"
                }
                resetForm()
                dispatch(hideModal())
                dispatch(showSnackbar(payload))
                dispatch(getProductList())
            })
            .finally(() => setSubmitting(false))
            .catch(() => {
                const payload = {
                    open: true,
                    variant: 'error',
                    message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                }
                setSubmitting(false)
                dispatch(showSnackbar(payload))
            })
    }, [id, dispatch])

    const formik = useFormik({
        initialValues: {
            images: []
        },
        validationSchema,
        onSubmit: ({images}, actions) => {
            const data = new FormData()

            for(let i = 0; i < images.length; i++) {
                data.append('images', images[i])
            }

            if(type === 'serial') {
                updateSeasonScreens(data, actions)
            }else {
                updateFilmScreens(data, actions)
            }
        }
    })

    return (
        <Form maxWidth={maxWidth} title='Skreenshotlarni alamshtirish'>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    <ImageUpload
                        name='images'
                        error={formik.errors.images && formik.errors.images}
                        value={formik.values.images}
                        onChange={(e) => formik.setFieldValue('images', e)}
                    />
                </Grid>
                <ButtonWrapper>
                    <Button
                        type="button"
                        buttonstyle="danger"
                        onClick={() => dispatch(hideModal())}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        type="submit"
                        buttonstyle="primary"
                        disabled={formik.isSubmitting && (formik.touched.images && !!formik.errors.images)}
                    >
                        Saqlash
                    </Button>
                </ButtonWrapper>
            </SectionForm>
        </Form>
    )
}