import {useFormik} from "formik";
import {useCallback, useEffect, useState} from "react";
import * as Yup from "yup";
import genre from "../../Service/genre";
import {useDispatch} from "react-redux";
import {getGenreList} from "../../Models/genre";
import {hideModal} from "../../Models/site";

export const useGenreForm = (props) => {
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
        genre.updateGenre(id, data)
          .then(res => {
            if (res.success) {
              dispatch(getGenreList())
              dispatch(hideModal())
              resetForm()
            }
          }).finally(() => setSubmitting(false))
          .catch(e => {
            console.log(e);
          })
      } else {
        genre.createGenre(data)
          .then(res => {
            if (res.success) {
              dispatch(getGenreList())
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
    if (id) {
      genre.getGenre(id)
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
    getGenreInfo()
  }, [getGenreInfo])

  return {
    formik,
    error
  }
}