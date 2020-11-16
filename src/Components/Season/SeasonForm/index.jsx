import React from 'react'
import { useDispatch } from 'react-redux'
import { useSeasonForm } from '../../../Hooks/product'
import {
    SectionForm, Grid, ButtonWrapper, GridItem
} from '../../GlobalStyles'
import { FileUploadInput, NormalInput } from '../../FormElements/Inputs'
import Button from '../../FormElements/Button'
import { hideModal } from '../../../Models/app'
import { RuFormInput, UzFormInput } from '../../MultilangFormInput'
import { Form } from '../../Form'
import Tabs from '../../Tabs'

export default ({ maxWidth, filmId, id }) => {
    const { formik, error, submitDisabled } = useSeasonForm({ filmId, id })
    const dispatch = useDispatch()

    const tabData = [
        {
            id: 'uz',
            title: "O'zbek",
            components: [<UzFormInput formik={formik} />]
        },
        {
            id: 'ru',
            title: 'Русский',
            components: [<RuFormInput formik={formik} />]
        }
    ]

    return (
        <Form title="Sezon qo'shish" maxWidth={maxWidth}>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Tabs data={tabData} formError={error}>
                    <Grid perColumn={2} style={{ marginTop: 16 }}>
                        <NormalInput
                            name="year"
                            label="Sezon ishlab chiqarilgan sana"
                            value={formik.values.year}
                            onChange={(e) => formik.setFieldValue('year', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.year && formik.errors.year}
                        />
                        <NormalInput
                            name="num"
                            label="Seriyalar soni"
                            value={formik.values.num}
                            onChange={(e) => formik.setFieldValue('num', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.num && formik.errors.num}
                        />
                        {
                            !id && (
                                <GridItem gridColumn="1/3">
                                    <FileUploadInput
                                        label="Rasm qo'shish"
                                        value={formik.values.image}
                                        name="image"
                                        onChange={(e) => formik.setFieldValue('image', e)}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.image && formik.errors.image}
                                    />
                                </GridItem>
                            )
                        }

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
