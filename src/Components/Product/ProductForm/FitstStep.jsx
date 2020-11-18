import React from 'react'
import { Grid} from "../../GlobalStyles";
import {NormalInput, SelectInput} from "../../FormElements/Inputs";
import {yearOptions} from "../../../utils/yearUtils";
import Tabs from "../../Tabs";
import {RuFormInput, UzFormInput} from "../../MultilangFormInput";

export default (
    {
        formik,
        categoryLoading,
        categoryOptions,
        genreLoading,
        genreOptions,
        memberLoading,
        memberOptions,
        priceOptions,
        statusOptions,
        error,
        type,
        getTitle
    }
) => {
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

    return <Tabs data={tabData} formError={error}>
        <Grid perColumn={2} style={{marginTop: 16}}>
            {
                type !== 'serial'
                && (
                    <NormalInput
                        name="video"
                        label="Video havolani kiriting"
                        value={formik.values.video}
                        onChange={(e) => formik.setFieldValue('video', e)}
                        onBlur={formik.handleBlur}
                        error={formik.touched.video && formik.errors.video}
                    />
                )
            }
            <NormalInput
                name="country"
                label={`${getTitle(type)} ishlab chiqarilgan mamlakat`}
                value={formik.values.country}
                onChange={(e) => formik.setFieldValue('country', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.country && formik.errors.country}
            />
            <SelectInput
                name="year"
                label={`${getTitle(type)} ishlab chiqarilgan yil`}
                loading={false}
                options={yearOptions()}
                value={formik.values.year}
                onChange={(e) => formik.setFieldValue('year', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.year && formik.errors.year}
            />
            <SelectInput
                name="category"
                label="Kategoriyani tanlang"
                loading={categoryLoading}
                options={categoryOptions}
                value={formik.values.category}
                onChange={(e) => formik.setFieldValue('category', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.category && formik.errors.category}
            />
            <SelectInput
                name="janr"
                label="Janrni tanlang"
                multiple
                loading={genreLoading}
                options={genreOptions}
                value={formik.values.janr}
                onChange={(e) => formik.setFieldValue('janr', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.janr && formik.errors.janr}
            />
            <SelectInput
                name="translator"
                label="Ishtirokchini tanlang"
                loading={memberLoading}
                options={memberOptions}
                value={formik.values.translator}
                onChange={(e) => formik.setFieldValue('translator', e)}
                onBlur={formik.handleBlur}
                multiple
                error={formik.touched.translator && formik.errors.translator}
            />
            <SelectInput
                name="price"
                label="To'lov turi"
                options={priceOptions}
                value={formik.values.price}
                onChange={(e) => formik.setFieldValue('price', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.price && formik.errors.price}
            />
            <SelectInput
                name="status"
                label="Status"
                options={statusOptions}
                value={formik.values.status}
                onChange={(e) => formik.setFieldValue('status', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.status && formik.errors.status}
            />
        </Grid>
    </Tabs>
}