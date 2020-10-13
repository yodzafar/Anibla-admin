import {useFormik} from "formik";
import * as Yup from 'yup'
import {useCallback, useEffect, useState} from "react";
import category from "../../Service/category";
import {useParams, useHistory} from 'react-router-dom'

export const useCategoryForm = () => {
  const {editID} = useParams()
  const {push} = useHistory()
  const [error, setError] = useState({})
  const [initialValues, setInitialValues] = useState({
    nameuz: '',
    nameru: ''
  })

  const validationSchema = new Yup.object().shape({
    nameuz: Yup.string().required('Maydon to\'ldirilshi shart'),
    nameru: Yup.string().required('Maydon to\'ldirilshi shart')
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: ({nameuz, nameru}, {setSubmitting, resetForm}) => {
      setSubmitting(true)
      const data = {
        nameuz,
        nameru,
      }

      if (editID) {
        category.updateCategory(editID, data)
          .then(res => {
            if (res.success) {
              push('/category')
            }
          }).finally(() => setSubmitting(false))
          .catch(e => {
            console.log(e);
          })
      } else {
        category.createCategory(data)
          .then(res => {
            if (res.success) {
              resetForm()
            }
          }).finally(() => setSubmitting(false))
          .catch(e => {
            console.log(e);
          })
      }
    }
  })

  const getCategoryInfo = useCallback(() => {
    if (editID) {
      category.getCategory(editID)
        .then(res => {
          if (res.success) {
            setInitialValues({
              nameuz: res.data.nameuz,
              nameru: res.data.nameru
            })
          }
        }).catch(e => {
        console.log(e);
      })
    }
  }, [editID])

  useEffect(() => {
    const errData = Object.keys(formik.errors)
    const tmp = {}
    for (let i = 0; i < errData.length; i++) {
      if (formik.touched[errData[i]]) {
        const key = errData[i].split('_')[1]
        tmp[key] = true
      }
    }
    setError(tmp);
  }, [formik.errors, formik.touched])

  useEffect(() => {
    getCategoryInfo()
  }, [getCategoryInfo])

  return {
    formik,
    error
  }
}