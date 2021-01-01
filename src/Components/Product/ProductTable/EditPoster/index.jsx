import React, {useCallback} from 'react'
import {useFormik} from "formik";
import {Form} from "../../../Form";
import * as Yup from 'yup'
import {imageExtValidate} from "../../../../utils/ext-validate";
import {imgObgj, readFileAsDataURL} from "../../../../utils/imageSize";
import {FileUploadInput} from "../../../FormElements/Inputs";
import {ButtonWrapper, Grid, SectionForm} from "../../../GlobalStyles";
import Button from "../../../FormElements/Button";
import {hideModal} from "../../../../Models/app";
import {useDispatch} from "react-redux";
import product from "../../../../Service/product";
import {showSnackbar} from "../../../../Models/app/actions";
import {getProductList, getSeasonList} from "../../../../Models/product";

export const EditPoster = ({id, type}) => {
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        images: Yup.mixed()
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
    })

    const updateSeasonPoster = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        product.updateSeasonPoster({id, data})
            .then(res => {
                const payload = {
                    open: true,
                    variant: 'success',
                    message: "Muqova muvaffaqiyatli almashtirildi"
                }
                resetForm()
                dispatch(showSnackbar(payload))
                dispatch(hideModal())
                dispatch((getSeasonList()))
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

    const updateFilmPoster = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        product.updateProductPoster({id, data})
            .then(() => {
                const payload = {
                    open: true,
                    variant: 'success',
                    message: "Muqova muvaffaqiyatli almashtirildi"
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
            images: undefined,
        },
        validationSchema,
        onSubmit: ({images}, actions) => {
            const data = new FormData()

            data.append('images', images)

            if (type === 'serial') {
                updateSeasonPoster(data, actions)
            } else {
                updateFilmPoster(data, actions)
            }
        }
    })

    return (
        <Form title='Muqovani alamshtirish'>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    <FileUploadInput
                        label="Muqova rasmini yuklang"
                        value={formik.values.images}
                        name="images"
                        onChange={(e) => formik.setFieldValue('images', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.images && formik.errors.images}
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