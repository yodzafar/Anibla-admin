import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ButtonWrapper, DisabledContainer, Grid, SectionForm
} from '../../GlobalStyles';
import { RuFormInput, UzFormInput } from '../../MultilangFormInput';
import Tabs from '../../Tabs'
import { Form } from '../../Form';
import { NormalInput, SelectInput } from '../../FormElements/Inputs';
import ImageUpload from '../../ImageIpload'
import Button from '../../FormElements/Button';
import { hideModal } from '../../../Models/site';

export default (props) => {
  const {
    formik,
    genreLoading,
    genreOptions,
    error,
    memberOptions,
    memberLoading,
    categoryOptions,
    categoryLoading,
    submitDisabled,
    statusOptions,
    priceOptions,
    maxWidth,
    type,
    id
  } = props
  const dispatch = useDispatch()

  const tabData = [
    {
      id: 'uz',
      title: "O'zbek",
      components: [<UzFormInput formik={formik} />]
    },
    {
      id: 'ru',
      title: 'Русский',
      components: [<RuFormInput formik={formik} />]
    }
  ]

  return (
    <Form title="Mahsulot qo'shish" maxWidth={maxWidth}>
      <SectionForm onSubmit={formik.handleSubmit}>
        <Tabs data={tabData} formError={error}>
          <Grid perColumn={2} style={{ marginTop: 16 }}>
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
              name="year"
              label="Mahsulot ishlab chiqarilgan sana"
              value={formik.values.year}
              onChange={(e) => formik.setFieldValue('year', e)}
              onBlur={formik.handleBlur}
              error={formik.touched.year && formik.errors.year}
            />
            <NormalInput
              name="country"
              label="Mahsulot ishlab chiqarilgan davlat"
              value={formik.values.country}
              onChange={(e) => formik.setFieldValue('country', e)}
              onBlur={formik.handleBlur}
              error={formik.touched.country && formik.errors.country}
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
          {
            !id && (
              <DisabledContainer disabled={!!id} style={{ marginTop: 16 }}>
                <ImageUpload
                  value={formik.values.images}
                  onChange={(e) => formik.setFieldValue('images', e)}
                />
              </DisabledContainer>
            )
          }
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
              disabled={submitDisabled()}
            >
              Saqlash
            </Button>
          </ButtonWrapper>
        </Tabs>
      </SectionForm>
    </Form>
  )
}
