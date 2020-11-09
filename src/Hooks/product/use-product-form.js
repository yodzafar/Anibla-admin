/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
import { useFormik } from 'formik'
import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import genre from '../../Service/genre'
import member from '../../Service/member'
import category from '../../Service/category'
import product from '../../Service/product'
import { getProductList } from '../../Models/product';
import { BASE_URL } from '../../Constants/url'
import { hideModal } from '../../Models/site';

const baseUrl = process.env.REACT_APP_BASE_URL

const statusOptions = [
  {
    id: '1',
    name: "Saytda ko'rsatish"
  },
  {
    id: '0',
    name: "Saytda ko'rsatmaslik"
  }
]

const priceOptions = [
  {
    id: 'free',
    name: "To'lovsiz"
  },
  {
    id: 'selling',
    name: "To'lovli"
  }
]

export const useProductForm = ({ type, id }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [genreOptions, setGenreOptions] = useState([])
  const [genreLoading, setGenreLoading] = useState(false)
  const [memberOptions, setMemberOptions] = useState([])
  const [memberLoading, setMemberLoading] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    nameuz: '',
    nameru: '',
    descriptionuz: '',
    descriptionru: '',
    video: '',
    category: '',
    translator: [],
    images: [],
    year: '',
    country: '',
    janr: [],
    status: '1',
    type,
    price: 'free'
  });

  const validationSchema = new Yup.object().shape({
    nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
    nameru: Yup.string().required("Maydon to'ldirilishi shart"),
    descriptionuz: Yup.string().required("Maydon to'ldirilishi shart"),
    descriptionru: Yup.string().required("Maydon to'ldirilishi shart"),
    video: Yup.string(),
    year: Yup.string().required("Maydon to'ldirilishi shart"),
    country: Yup.string().required("Maydon to'ldirilishi shart"),
    janr: Yup.array().required("Maydon to'ldirilishi shart"),
    translator: Yup.array().required("Maydon to'ldirilishi shart"),
    images: Yup.array().required("Maydon to'ldirilishi shart"),
    category: Yup.string().required("Maydon to'ldirilishi shart"),
    status: Yup.string().required("Maydon to'ldirilishi shart"),
    type: Yup.string().required("Maydon to'ldirilishi shart"),
    price: Yup.string().required("Maydon to'ldirilishi shart")
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)

      if (!id) {
        const data = new FormData()
        const { janr, translator, images } = values

        data.append('nameuz', values.nameuz)
        data.append('nameru', values.nameru)
        data.append('descriptionuz', values.descriptionuz)
        data.append('descriptionru', values.descriptionru)
        data.append('year', values.year)
        data.append('country', values.country)
        data.append('category', values.category)
        data.append('status', !!Number(values.status))
        data.append('type', values.type)
        data.append('price', values.price)

        if (type !== 'serial') {
          data.append('video', values.video)
        }

        if (!id) {
          for (let i = 0; i < images.length; i++) {
            data.append('images', images[i])
          }
        }

        for (let i = 0; i < janr.length; i++) {
          data.append('janr[]', janr[i])
        }

        for (let i = 0; i < translator.length; i++) {
          data.append('translator[]', translator[i])
        }
        product.createProduct(data)
          .then((res) => {
            if (res.success) {
              dispatch(getProductList({ type }))
              resetForm()
            }
          }).finally(() => setSubmitting(false))
          .catch(() => {
            setSubmitting(false)
          })
      } else {
        const data = {
          nameuz: values.nameuz,
          nameru: values.nameru,
          descriptionuz: values.descriptionuz,
          descriptionru: values.descriptionru,
          category: values.category,
          translator: values.translator,
          year: values.year,
          country: values.country,
          janr: values.janr,
          status: !!Number(values.status),
          type: values.type,
          price: values.price
        }

        if (type !== 'serial') {
          data.video = values.video
        }

        product.updateProduct({ id, data })
          .then((res) => {
            if (res.success) {
              dispatch(getProductList({ type }))
              resetForm()
              dispatch(hideModal())
            }
          })
          .finally(() => setSubmitting(false))
          .catch(() => {
            setSubmitting(false)
          })
      }
    }
  });

  const getGenre = useCallback(() => {
    setGenreLoading(true)
    genre.getAllGenre()
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item._id,
          name: item.nameuz
        }))
        setGenreOptions(data)
      })
      .finally(() => setGenreLoading(false))
      .catch(() => {
        setGenreLoading(false)
      })
  }, [])

  const getMember = useCallback(() => {
    setMemberLoading(true)
    member.getAllMember()
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item._id,
          name: item.name,
          img: `${baseUrl}${item.image}`
        }))
        setMemberOptions(data)
      })
      .finally(() => setMemberLoading(false))
      .catch(() => {
        setMemberLoading(false)
      })
  }, [])

  const getCategory = useCallback(() => {
    setCategoryLoading(true)
    category.getAllCategory()
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item._id,
          name: item.nameuz
        }))
        setCategoryOptions(data)
      })
      .finally(() => setCategoryLoading(false))
      .catch(() => {
        setCategoryLoading(false)
      })
  }, [])

  useMemo(() => {
    getGenre()
    getMember()
    getCategory()
  }, [getGenre, getMember, getCategory])

  useEffect(() => {
    const errData = Object.keys(formik.errors)
    const tmp = {}
    for (let i = 0; i < errData.length; i++) {
      if (formik.touched[errData[i]]) {
        if (errData[i].indexOf('uz') !== -1) {
          tmp.uz = true
        }

        if (errData[i].indexOf('ru') !== -1) {
          tmp.ru = true
        }
      }
    }
    setError(tmp);
  }, [formik.errors, formik.touched])

  const getProduct = useCallback(() => {
    if (id) {
      product.getProduct(id)
        .then((res) => {
          const { data } = res
          setInitialValues({
            nameuz: data.name.uz,
            nameru: data.name.ru,
            descriptionuz: data.description.uz,
            descriptionru: data.description.ru,
            year: data.info.year,
            country: data.info.country,
            status: data.status === 'true' ? '1' : '0',
            video: data.video ? data.video : '',
            janr: data.info.janr.map((item) => item._id),
            translator: data.translator.map((item) => item._id),
            category: data.category._id,
            images: [data.image, ...data.screens].map((item) => `${BASE_URL}/${item}`),
            price: data.price,
            type
          })
        }).catch(() => {
        })
    }
  }, [id, type])

  const submitDisabled = () => formik.isSubmitting
    || (formik.touched.nameru && !!formik.errors.nameru)
    || (formik.touched.nameuz && !!formik.errors.nameuz)
    || (formik.touched.descriptionru && !!formik.errors.descriptionru)
    || (formik.touched.descriptionuz && !!formik.errors.descriptionuz)
    || (formik.touched.video && !!formik.errors.video)
    || (formik.touched.category && !!formik.errors.category)
    || (formik.touched.year && !!formik.errors.year)
    || (formik.touched.janr && !!formik.errors.janr)
    || (formik.touched.translator && !!formik.errors.translator)
    || (formik.touched.images && !!formik.errors.images)
    || (formik.touched.status && !!formik.errors.status)
    || (formik.touched.price && !!formik.errors.price)
    || (formik.touched.type && !!formik.errors.type)

  useEffect(() => {
    getProduct()
  }, [getProduct])

  return {
    formik,
    genreOptions,
    genreLoading,
    error,
    memberOptions,
    memberLoading,
    categoryOptions,
    categoryLoading,
    submitDisabled,
    statusOptions,
    priceOptions
  }
}
