/* eslint-disable new-cap */
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import member from '../../Service/member';
import { getMemberList } from '../../Models/member';
import { imageExtValidate } from '../../utils/ext-validate';
import {showSnackbar} from "../../Models/app/actions";
import {URL_TITLE} from "../../Constants/url";

export const useMemberForm = () => {
  const dispatch = useDispatch()
  const [initialValues] = useState({
    name: '',
    file: null
  })

  const validationSchema = new Yup.object().shape({
    name: Yup.string().required('Maydon to\'ldirilshi shart'),
    file: Yup.mixed()
      .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
        file && typeof file === 'string'
            ? imageExtValidate(file)
            : file && (file.type === 'image/jpeg' || file.type === 'image/png')))
        .required('Maydon to\'ldirilshi shart')
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: ({ name, file }, { setSubmitting, resetForm }) => {
      setSubmitting(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('file', file)

      member.createMember(formData)
        .then((res) => {
          if (res.success) {
            const payload = {
              open: true,
              variant: 'success',
              message: `${URL_TITLE.MEMBER.TITLE} muvaffaqiyatli qo'shildi`
            }
            dispatch(showSnackbar(payload))
            dispatch(getMemberList())
            resetForm()
          }
        })
        .finally(() => setSubmitting(false))
        .catch(() => {
          const payload = {
            open: true,
            variant: 'error',
            message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
          }
          dispatch(showSnackbar(payload))
          setSubmitting(false)
        })
    }
  })

  return {
    formik,
  }
}
