import React from 'react'
import {useDispatch} from 'react-redux'
import {
    SectionForm, Grid, ButtonWrapper, GridItem
} from '../../GlobalStyles'
import {FileUploadInput} from '../../FormElements/Inputs'
import Button from '../../FormElements/Button'
import {hideModal} from '../../../Models/app'
import {RuFormInput, UzFormInput} from '../../MultilangFormInput'
import {Form} from '../../Form'
import Tabs from '../../Tabs'
import {useNewsForm} from "../../../Hooks/news";
import {URL_TITLE} from "../../../Constants/url";

export default ({maxWidth}) => {
    const {formik, error, submitDisabled} = useNewsForm()
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
        <Form title={URL_TITLE.NEWS.TITLE_ADD} maxWidth={maxWidth}>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Tabs data={tabData} formError={error}>
                    <Grid perColumn={1} style={{marginTop: 16}}>
                        <GridItem>
                            <FileUploadInput
                                label="Rasm qo'shish"
                                value={formik.values.image}
                                name="image"
                                onChange={(e) => formik.setFieldValue('image', e)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.image && formik.errors.image}
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
