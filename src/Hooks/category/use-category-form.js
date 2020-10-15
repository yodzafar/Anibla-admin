import {useFormik} from "formik";
import * as Yup from 'yup'
import {useCallback, useEffect, useState} from "react";
import category from "../../Service/category";
import {useDispatch} from "react-redux";
import {getCategoryList} from "../../Models/category";
import {hideModal} from "../../Models/site";

export const useCategoryForm = (props) => {
  const {id} = props
  const dispatch = useDispatch()
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

      if (id) {
        category.updateCategory(id, data)
          .then(res => {
            if (res.success) {
              dispatch(getCategoryList())
              dispatch(hideModal())
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
              dispatch(getCategoryList())
            }
          }).finally(() => setSubmitting(false))
          .catch(e => {
            console.log(e);
          })
      }
    }
  })

  const getCategoryInfo = useCallback(() => {
    if (id) {
      category.getCategory(id)
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
  }, [id])

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