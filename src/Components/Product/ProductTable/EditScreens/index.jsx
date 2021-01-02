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
import {imageExtValidate} from "../../../../utils/ext-validate";
import {imgObgj, readFileAsDataURL} from "../../../../utils/imageSize";
import {FileUploadInput} from "../../../FormElements/Inputs";

export const EditScreens = ({id, maxWidth, type}) => {
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
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
        sliderImg: Yup.mixed()
            .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
                file && typeof file === 'string'
                    ? imageExtValidate(file)
                    : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
            .test('sliderImageSize', "Slider rasmi o'lchami 1440x600 talab etiladi", async (file) => {
                if (file && typeof file !== 'string') {
                    const base64Url = await readFileAsDataURL(file)
                    const image = await imgObgj(base64Url)
                    return image.naturalWidth === 1440 && image.naturalHeight === 600
                }
                return true
            }).required("Maydon to'ldirilishi shart"),
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
            screens: [],
            sliderImg: undefined
        },
        validationSchema,
        onSubmit: ({sliderImg, screens}, actions) => {
            const data = new FormData()

            const images = [sliderImg, ...screens]

            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i])
            }

            if (type === 'serial') {
                updateSeasonScreens(data, actions)
            } else {
                updateFilmScreens(data, actions)
            }
        }
    })
    console.log(formik);

    return (
        <Form maxWidth={maxWidth} title='Skreenshotlarni alamshtirish'>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    <FileUploadInput
                        label="Slider uchun rasmini yuklang"
                        value={formik.values.sliderImg}
                        name="sliderImg"
                        onChange={(e) => formik.setFieldValue('sliderImg', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.sliderImg && formik.errors.sliderImg}
                    />
                    <ImageUpload
                        name='screens'
                        error={formik.errors.screens && formik.errors.screens}
                        value={formik.values.screens}
                        onChange={(e) => formik.setFieldValue('screens', e)}
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
                        disabled={
                            formik.isSubmitting
                            || (formik.touched.sliderImg && !!formik.errors.sliderImg)
                            ||(formik.touched.screens && !!formik.errors.screens)

                        }
                    >
                        Saqlash
                    </Button>
                </ButtonWrapper>
            </SectionForm>
        </Form>
    )
}