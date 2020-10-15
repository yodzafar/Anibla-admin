import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import * as Yup from "yup";
import genre from "../../Service/genre";

export const useGenreForm = () => {
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
        genre.updateGenre(editID, data)
          .then(res => {
            if (res.success) {
              push('/category')
            }
          }).finally(() => setSubmitting(false))
          .catch(e => {
            console.log(e);
          })
      } else {
        genre.createGenre(data)
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

  const getGenreInfo = useCallback(() => {
    if (editID) {
      genre.getGenre(editID)
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
    getGenreInfo()
  }, [getGenreInfo])

  return {
    formik,
    error
  }
}