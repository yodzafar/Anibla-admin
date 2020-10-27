import React from 'react'
import { NormalInput, Textarea } from '../../../FormElements/Inputs'
import { Grid } from '../../../GlobalStyles';

export const RuFormInput = ({ formik }) => (
  <Grid>
    <NormalInput
      value={formik.values.nameru}
      name="nameru"
      onChange={(e) => formik.setFieldValue('nameru', e)}
      label="Mahsulot nomi (ru)"
      error={formik.touched.nameru && formik.errors.nameru}
      onBlur={formik.handleBlur}
    />
    <Textarea
      value={formik.values.descriptionru}
      name="descriptionru"
      onChange={(e) => formik.setFieldValue('descriptionru', e)}
      label="Mahsulot haqida ma'lumot (ru)"
      error={formik.touched.descriptionru && formik.errors.descriptionru}
      onBlur={formik.handleBlur}
    />
  </Grid>
);
