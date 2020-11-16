import React from 'react'
import {useDispatch} from 'react-redux'
import {
    SectionForm, Grid, ButtonWrapper, GridItem
} from '../../GlobalStyles'
import {NormalInput} from '../../FormElements/Inputs'
import Button from '../../FormElements/Button'
import {hideModal} from '../../../Models/app'
import {RuFormInput, UzFormInput} from '../../MultilangFormInput'
import {Form} from '../../Form'
import Tabs from '../../Tabs'
import {URL_TITLE} from "../../../Constants/url";
import {useAnnotationForm} from "../../../Hooks/annotation";

export default ({maxWidth}) => {
    const {formik, error, submitDisabled} = useAnnotationForm()
    const dispatch = useDispatch()

    const tabData = [
        {
            id: 'uz',
            title: "O'zbek",
            components: [<UzFormInput formik={formik}/>]
        },
        {
            id: 'ru',
            title: 'Русский',
            components: [<RuFormInput formik={formik}/>]
        }
    ]

    return (
        <Form title={URL_TITLE.ANNOTATION.TITLE_ADD} maxWidth={maxWidth}>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Tabs data={tabData} formError={error}>
                    <Grid perColumn={1} style={{marginTop: 16}}>
                        <GridItem>
                            <NormalInput
                                name="video"
                                label="Video havolani kiriting"
                                value={formik.values.video}
                                onChange={(e) => formik.setFieldValue('video', e)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.video && formik.errors.video}
                            />
                        </GridItem>
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
