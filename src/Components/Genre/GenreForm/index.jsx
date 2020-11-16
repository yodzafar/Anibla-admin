import React from 'react'
import { useDispatch } from 'react-redux';
import { NormalInput } from '../../FormElements/Inputs';
import { ButtonWrapper, Grid, SectionForm } from '../../GlobalStyles';
import Button from '../../FormElements/Button';
import { useGenreForm } from '../../../Hooks/genre';
import { Form } from '../../Form';
import { hideModal } from '../../../Models/app';

export default (props) => {
  const dispatch = useDispatch()
  const { formik } = useGenreForm(props)

  return (
    <Form title="Janr qo'shish">
      <SectionForm onSubmit={formik.handleSubmit}>
        <Grid>
          <NormalInput
            value={formik.values.nameuz}
            name="nameuz"
            onChange={(e) => formik.setFieldValue('nameuz', e)}
            label="Janr nomi (uz)"
            error={formik.touched.nameuz && formik.errors.nameuz}
            onBlur={formik.handleBlur}
          />
          <NormalInput
            value={formik.values.nameru}
            name="nameru"
            onChange={(e) => formik.setFieldValue('nameru', e)}
            label="Janr nomi (ru)"
            error={formik.touched.nameru && formik.errors.nameru}
            onBlur={formik.handleBlur}
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
              || (formik.touched.nameru && !!formik.errors.nameru)
              || (formik.touched.nameuz && !!formik.errors.nameuz)
            }
          >
            Saqlash
          </Button>
        </ButtonWrapper>
      </SectionForm>
    </Form>
  )
}
