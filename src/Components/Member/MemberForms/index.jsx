import React from 'react'
import { useDispatch } from 'react-redux';
import { ButtonWrapper, Grid, SectionForm } from '../../GlobalStyles';
import { FileUploadInput, NormalInput } from '../../FormElements/Inputs';
import { useMemberForm } from '../../../Hooks/member';
import Button from '../../FormElements/Button';
import { Form } from '../../Form';
import { hideModal } from '../../../Models/app';

export default () => {
  const dispatch = useDispatch()
  const { formik, clear } = useMemberForm()
  return (
    <Form
      title="Ishtirokchi qo'shish"
    >
      <SectionForm onSubmit={formik.handleSubmit}>
        <Grid>
          <NormalInput
            label="Ishtirokchi familiya ismi sharifi"
            name="name"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue('name', e)}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
          />
          <FileUploadInput
            label="Ishtirokchi rasmini yuklang"
            value={formik.values.file}
            name="file"
            onChange={(e) => formik.setFieldValue('file', e)}
            onBlur={formik.handleBlur}
            error={formik.touched.file && formik.errors.file}
            clear={clear}
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
              || (formik.touched.name && !!formik.errors.name)
              || (!!formik.errors.file)
            }
          >
            Saqlash
          </Button>
        </ButtonWrapper>
      </SectionForm>
    </Form>
  )
}
