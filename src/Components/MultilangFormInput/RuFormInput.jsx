import React from 'react'
import { NormalInput, Textarea } from '../FormElements/Inputs'
import { Grid } from '../GlobalStyles';

export const RuFormInput = ({ formik, desc }) => (
  <Grid>
    <NormalInput
      value={formik.values.nameru}
      name="nameru"
      onChange={(e) => formik.setFieldValue('nameru', e)}
      label="Nomi (ru)"
      error={formik.touched.nameru && formik.errors.nameru}
      onBlur={formik.handleBlur}
    />
    {
      desc === undefined
      && (
        <Textarea
          value={formik.values.descriptionru}
          name="descriptionru"
          onChange={(e) => formik.setFieldValue('descriptionru', e)}
          label="Ma'lumot (ru)"
          error={formik.touched.descriptionru && formik.errors.descriptionru}
          onBlur={formik.handleBlur}
        />
      )
    }

  </Grid>
);
