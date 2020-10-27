import React from 'react'
import { NormalInput, Textarea } from '../../../FormElements/Inputs'
import { Grid } from '../../../GlobalStyles'

export const UzFormInput = ({ formik }) => (
  <Grid>
    <NormalInput
      value={formik.values.nameuz}
      name="nameuz"
      onChange={(e) => formik.setFieldValue('nameuz', e)}
      label="Mahsulot nomi (uz)"
      error={formik.touched.nameuz && formik.errors.nameuz}
      onBlur={formik.handleBlur}
    />
    <Textarea
      value={formik.values.descriptionuz}
      name="descriptionuz"
      onChange={(e) => formik.setFieldValue('descriptionuz', e)}
      label="Mahsulot haqida ma'lumot (uz)"
      error={formik.touched.descriptionuz && formik.errors.descriptionuz}
      onBlur={formik.handleBlur}
    />
  </Grid>
)
