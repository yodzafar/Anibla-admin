import React from 'react'
import {FileUploadInput} from "../../FormElements/Inputs";
import {Grid} from "../../GlobalStyles";
import ImageUpload from "../../ImageIpload";

export default (props) => {
    const {
        formik,
    } = props

    return (
        <>
            <Grid>
                <FileUploadInput
                    label="Muqova rasmini yuklang"
                    value={formik.values.cover}
                    name="cover"
                    onChange={(e) => formik.setFieldValue('cover', e)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cover && formik.errors.cover}
                />
                <FileUploadInput
                    label="Slider uchun rasmini yuklang"
                    value={formik.values.sliderImg}
                    name="sliderImg"
                    onChange={(e) => formik.setFieldValue('sliderImg', e)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sliderImg && formik.errors.sliderImg}
                />
                <ImageUpload
                    name='screens'
                    error={formik.errors.screens && formik.errors.screens}
                    value={formik.values.screens}
                    onChange={(e) => formik.setFieldValue('screens', e)}
                />
            </Grid>
        </>
    )
}