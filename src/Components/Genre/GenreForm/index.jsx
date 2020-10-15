import React from 'react'
import Tabs from '../../Tabs'
import {NormalInput} from "../../FormElements/Inputs";
import {ButtonWrapper, SectionForm} from "../../GlobalStyles";
import Button from "../../FormElements/Button";
import {useGenreForm} from "../../../Hooks/genre";

export default () => {
const {formik, error} = useGenreForm()

  const uzFormInput = (
    <NormalInput
      value={formik.values.nameuz}
      name='nameuz'
      onChange={(e) => formik.setFieldValue('nameuz', e)}
      label="Kategoriya nomi (uz)"
      error={formik.touched.nameuz && formik.errors.nameuz}
      onBlur={formik.handleBlur}
    />
  )

  const ruFormInput = (
    <NormalInput
      value={formik.values.nameru}
      name='nameru'
      onChange={(e) => formik.setFieldValue('nameru', e)}
      label="Название категории (ру)"
      error={formik.touched.nameru && formik.errors.nameru}
      onBlur={formik.handleBlur}
    />
  )

  const tabData = [
    {
      id: 'uz',
      title: "O'zbek",
      components: [uzFormInput],
    },
    {
      id: 'ru',
      title: "Русский",
      components: [ruFormInput]
    }
  ]

  return (
    <SectionForm onSubmit={formik.handleSubmit}>
      <Tabs
        data={tabData}
        formError={error}
      />
      <ButtonWrapper>
        <Button
          type='submit'
          buttonstyle='primary'
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
  )
}