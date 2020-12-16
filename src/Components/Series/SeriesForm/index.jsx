import React from 'react'
import { useDispatch } from 'react-redux'
import { useSeriyaForm } from '../../../Hooks/product'
import {
    SectionForm, Grid, ButtonWrapper
} from '../../GlobalStyles'
import {NormalInput} from '../../FormElements/Inputs'
import Button from '../../FormElements/Button'
import { hideModal } from '../../../Models/app'
import { RuFormInput, UzFormInput } from '../../MultilangFormInput'
import { Form } from '../../Form'
import Tabs from '../../Tabs'

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
