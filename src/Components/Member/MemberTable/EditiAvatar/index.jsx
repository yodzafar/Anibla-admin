import React from 'react'
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
import member from "../../../../Service/member";
import {showSnackbar} from "../../../../Models/app/actions";
import {getMemberList} from "../../../../Models/member";

export const EditAvatar = ({id}) => {
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        file: Yup.mixed()
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


    const formik = useFormik({
        initialValues: {
            file: undefined,
        },
        validationSchema,
        onSubmit: ({file}, {setSubmitting, resetForm}) => {
            setSubmitting(true)
            const data = new FormData()
            data.append('file', file)

            member.updateMemberAvatar({id, data})
                .then(() => {
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Avatar muvvaffaqiyatli alamshtirildi'
                    }
                    dispatch(getMemberList())
                    dispatch(showSnackbar(payload))
                    dispatch(hideModal())
                })
                .finally(() => setSubmitting(false))
                .catch(() => {
                    const payload = {
                        open: true,
                        variant: 'error',
                        message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                    }
                    dispatch(showSnackbar(payload))
                })

        }
    })

    return (
        <Form title='Avatarni alamshtirish'>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    <FileUploadInput
                        label="Avatarni yuklang"
                        value={formik.values.file}
                        name="file"
                        onChange={(e) => formik.setFieldValue('file', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.file && formik.errors.file}
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