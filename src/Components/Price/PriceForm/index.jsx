import React from 'react'
import {ButtonWrapper, Grid, SectionForm} from "../../GlobalStyles";
import {Form} from "../../Form";
import {URL_TITLE} from "../../../Constants/url";
import {usePriceForm} from "../../../Hooks/price";
import {NormalInput, SelectInput} from "../../FormElements/Inputs";
import Button from "../../FormElements/Button";
import {hideModal} from "../../../Models/app";
import {useDispatch} from "react-redux";

export default ({id}) => {
    const {formik, priceOptions} = usePriceForm({id})
    const dispatch = useDispatch()
    return (
        <Form title={URL_TITLE.PRICE.TITLE_ADD}>
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    <NormalInput
                        value={formik.values.name}
                        name="name"
                        onChange={(e) => formik.setFieldValue('name', e)}
                        label="To'lov nomi"
                        error={formik.touched.name && formik.errors.name}
                        onBlur={formik.handleBlur}
                    />
                    <NormalInput
                        type='number'
                        name='amount'
                        label='Narx'
                        value={formik.values.amount}
                        onChange={(e) => formik.setFieldValue('amount', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.amount && formik.errors.amount}
                    />
                    <SelectInput
                        name="type"
                        label="To'lov muddati"
                        loading={false}
                        options={priceOptions}
                        value={formik.values.type}
                        onChange={(e) => formik.setFieldValue('type', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.type && formik.errors.type}
                    />
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
                                || (formik.touched.name && !!formik.errors.name)
                                || (formik.touched.amount && !!formik.errors.amount)
                                || (formik.touched.type && !!formik.errors.type)
                            }
                        >
                            Saqlash
                        </Button>
                    </ButtonWrapper>
                </Grid>
            </SectionForm>
        </Form>
    )
}