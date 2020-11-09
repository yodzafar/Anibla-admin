import React from 'react'
import { NormalInput, Textarea } from '../FormElements/Inputs'
import { Grid } from '../GlobalStyles'

export const UzFormInput = ({ formik, desc }) => (
  <Grid>
    <NormalInput
      value={formik.values.nameuz}
      name="nameuz"
      onChange={(e) => formik.setFieldValue('nameuz', e)}
      label="Nomi (uz)"
      error={formik.touched.nameuz && formik.errors.nameuz}
      onBlur={formik.handleBlur}
    />
    {
      desc === undefined
      && (
        <Textarea
          value={formik.values.descriptionuz}
          name="descriptionuz"
          onChange={(e) => formik.setFieldValue('descriptionuz', e)}
          label="Ma'lumot (uz)"
          error={formik.touched.descriptionuz && formik.errors.descriptionuz}
          onBlur={formik.handleBlur}
        />
      )
    }
  </Grid>
)
