import React from 'react'
import { useDispatch } from 'react-redux'
import { useSeriyaForm } from '../../../Hooks/product'
import {
    SectionForm, Grid, ButtonWrapper, DisabledContainer
} from '../../GlobalStyles'
import {FileUploadInput, NormalInput} from '../../FormElements/Inputs'
import Button from '../../FormElements/Button'
import { hideModal } from '../../../Models/app'
import { RuFormInput, UzFormInput } from '../../MultilangFormInput'
import { Form } from '../../Form'
import Tabs from '../../Tabs'
import ImageUpload from '../../ImageIpload'

export default ({
    maxWidth, filmId, id, seasonId
}) => {
    const { formik, error, submitDisabled } = useSeriyaForm({ filmId, id, seasonId })
    const dispatch = useDispatch()

    const tabData = [
        {
            id: 'uz',
            title: "O'zbek",
            components: [<UzFormInput desc formik={formik} />]
        },
        {
            id: 'ru',
            title: 'Русский',
            components: [<RuFormInput desc formik={formik} />]
        }
    ]

    return (
        <Form title="Sezon qo'shish" maxWidth={maxWidth}>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Tabs data={tabData} formError={error}>
                    <Grid perColumn={2} style={{ marginTop: 16 }}>
                        <NormalInput
                            name="video"
                            label="Video havola"
                            value={formik.values.video}
                            onChange={(e) => formik.setFieldValue('video', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.video && formik.errors.video}
                        />
                        <NormalInput
                            name="length"
                            label="Video davomiyligi"
                            value={formik.values.length}
                            onChange={(e) => formik.setFieldValue('length', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.length && formik.errors.length}
                        />
                    </Grid>
                    {
                        !id && (
                            <DisabledContainer disabled={!!id} style={{ marginTop: 16 }}>
                                <Grid>
                                    <FileUploadInput
                                        label="Muqova rasmini yuklang"
                                        value={formik.values.cover}
                                        name="cover"
                                        onChange={(e) => formik.setFieldValue('cover', e)}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cover && formik.errors.cover}
                                    />
                                    <ImageUpload
                                        name='screens'
                                        value={formik.values.images}
                                        onChange={(e) => formik.setFieldValue('screens', e)}
                                        error={formik.errors.screens}
                                    />
                                </Grid>
                            </DisabledContainer>
                        )
                    }
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
                            disabled={submitDisabled()}
                        >
                            Saqlash
                        </Button>
                    </ButtonWrapper>
                </Tabs>
            </SectionForm>
        </Form>
    )
}
