import React from 'react'
import {Grid} from "../../GlobalStyles";
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
                ? (
                    <>
                        <NormalInput
                            name="video"
                            label="Video havolani kiriting"
                            value={formik.values.video}
                            onChange={(e) => formik.setFieldValue('video', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.video && formik.errors.video}
                        />
                        <NormalInput
                            name="url"
                            label="Ko'chirish uchun havola"
                            value={formik.values.url}
                            onChange={(e) => formik.setFieldValue('url', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.url && formik.errors.url}
                        />
                        <NormalInput
                            name="length"
                            label={`Video davomiyligi`}
                            value={formik.values.length}
                            onChange={(e) => formik.setFieldValue('length', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.length && formik.errors.length}
                        />
                    </>
                ) : (
                        <NormalInput
                            type='number'
                            name="num"
                            label='Seriyalar soni'
                            value={formik.values.num}
                            onChange={(e) => formik.setFieldValue('num', e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.num && formik.errors.num}
                        />
                    )
            }
            <NormalInput
                name="rejissor"
                label='Rejissorni kiriting'
                value={formik.values.rejissor}
                onChange={(e) => formik.setFieldValue('rejissor', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.rejissor && formik.errors.rejissor}
            />
            <NormalInput
                name="country"
                label={`${getTitle(type)} ishlab chiqarilgan mamlakat`}
                value={formik.values.country}
                onChange={(e) => formik.setFieldValue('country', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.country && formik.errors.country}
            />
            <NormalInput
                name="studia"
                label="Studiyani kiriting"
                value={formik.values.studia}
                onChange={(e) => formik.setFieldValue('studia', e)}
                onBlur={formik.handleBlur}
                error={formik.touched.studia && formik.errors.studia}
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
                multiple
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
                label="Ovoz beruvchini tanlang"
                loading={memberLoading}
                options={memberOptions}
                value={formik.values.translator}
                onChange={(e) => formik.setFieldValue('translator', e)}
                onBlur={formik.handleBlur}
                multiple
                error={formik.touched.translator && formik.errors.translator}
            />
            <SelectInput
                name="tarjimon"
                label="Tarjimonni tanlang"
                loading={memberLoading}
                options={memberOptions}
                value={formik.values.tarjimon}
                onChange={(e) => formik.setFieldValue('tarjimon', e)}
                onBlur={formik.handleBlur}
                multiple
                error={formik.touched.tarjimon && formik.errors.tarjimon}
            />
            <SelectInput
                name="tayming"
                label="Tayming tanlang"
                loading={memberLoading}
                options={memberOptions}
                value={formik.values.tayming}
                onChange={(e) => formik.setFieldValue('tayming', e)}
                onBlur={formik.handleBlur}
                multiple
                error={formik.touched.tayming && formik.errors.tayming}
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
        </Grid>
    </Tabs>
}