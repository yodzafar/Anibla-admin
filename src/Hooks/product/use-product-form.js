/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
import { useFormik } from 'formik'
import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import * as Yup from 'yup'
import genre from '../../Service/genre'
import member from '../../Service/member'
import category from '../../Service/category'
import product from '../../Service/product'

const baseUrl = process.env.REACT_APP_BASE_URL

export const useProductForm = ({ type }) => {
  const [error, setError] = useState({})
  const [genreOptions, setGenreOptions] = useState([])
  const [genreLoading, setGenreLoading] = useState(false)
  const [memberOptions, setMemberOptions] = useState([])
  const [memberLoading, setMemberLoading] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [initialValues] = useState({
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
    status: true,
    type
  });

  const validationSchema = new Yup.object().shape({
    nameuz: Yup.string().required("Maydon to'ldirilishi shart"),
    nameru: Yup.string().required("Maydon to'ldirilishi shart"),
    descriptionuz: Yup.string().required("Maydon to'ldirilishi shart"),
    descriptionru: Yup.string().required("Maydon to'ldirilishi shart"),
    video: Yup.string().required("Maydon to'ldirilishi shart"),
    year: Yup.string().required("Maydon to'ldirilishi shart"),
    country: Yup.string().required("Maydon to'ldirilishi shart"),
    janr: Yup.array().required("Maydon to'ldirilishi shart"),
    translator: Yup.array().required("Maydon to'ldirilishi shart"),
    images: Yup.array().required("Maydon to'ldirilishi shart"),
    category: Yup.string().required("Maydon to'ldirilishi shart"),
    status: Yup.boolean(),
    type: Yup.string().required("Maydon to'ldirilishi shart")
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      const data = new FormData()
      const keys = Object.keys(values)

      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(values[keys[i]])) {
          const arr = values[keys[i]]
          for (let j = 0; j < arr.length; j++) {
            if (keys[i] === 'images') {
              data.append(keys[i], arr[j])
            } else {
              data.append(`${keys[i]}[]`, arr[j])
            }
          }
        } else {
          data.append(keys[i], values[keys[i]])
        }
      }

      product.createProduct(data)
        .then((res) => {
          console.log(res);
        }).finally(() => setSubmitting(true))
        .catch((e) => {
          console.log(e);
          setSubmitting(false)
        })
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
      .catch((e) => {
        console.log(e)
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
      .catch((e) => {
        console.log(e)
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
      .catch((e) => {
        console.log(e)
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

  return {
    formik,
    genreOptions,
    genreLoading,
    error,
    memberOptions,
    memberLoading,
    categoryOptions,
    categoryLoading,
    submitDisabled
  }
}
