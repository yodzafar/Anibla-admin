/* eslint-disable new-cap */
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import member from '../../Service/member';
import { getMemberList } from '../../Models/member';
import { imageExtValidate } from '../../utils/ext-validate';

export const useMemberForm = () => {
  const dispatch = useDispatch()
  const [initialValues] = useState({
    name: '',
    file: null
  })
  const [clear, setClear] = useState(false)

  const validationSchema = new Yup.object().shape({
    name: Yup.string().required('Maydon to\'ldirilshi shart'),
    file: Yup.mixed().required('Maydon to\'ldirilshi shart')
      .test('fileType', 'Faqat jpeg yoki png turdagi rasmlarni yuklang', (file) => (
        file && typeof file === 'string'
            ? imageExtValidate(file)
            : (file.type === 'image/jpeg' || file.type === 'image/png')))
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
            setClear(true)
            dispatch(getMemberList())
            resetForm()
          }
        })
        .finally(() => {
          setSubmitting(false)
          setClear(false)
        })
        .catch((e) => {
          console.log(e.response);
          setSubmitting(false)
        })
    }
  })

  return {
    formik,
    clear
  }
}
