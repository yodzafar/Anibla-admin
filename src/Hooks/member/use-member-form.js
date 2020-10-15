import {useFormik} from "formik";
import {useState} from "react";
import * as Yup from 'yup'
import member from "../../Service/member";
import {useDispatch} from "react-redux";
import {getMemberList} from "../../Models/member";

export const useMemberForm = () => {
  const dispatch = useDispatch()
  const [initialValues] = useState({
    name: '',
    file: null
  })

  const validationSchema = new Yup.object().shape({
    name: Yup.string().required('Maydon to\'ldirilshi shart'),
    file: Yup.mixed().required('Maydon to\'ldirilshi shart')
      .test('fileType', "Faqat jpeg yoki png turdagir rasmlarni yuklang", (file) => {
        return file && (file.type === 'image/jpeg' || file.type === 'image/png')
      }),
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: ({name, file}, {setSubmitting, resetForm}) => {
      setSubmitting(true)

      const formData = new FormData()
      formData.append('name', name)
      formData.append('file', file)

      member.createMember(formData)
        .then(res => {
          if(res.success) {
            dispatch(getMemberList())
            resetForm()
          }
        })
        .finally(() => setSubmitting(false))
        .catch(e => {
          console.log(e.response);
          setSubmitting(false)
        })
    }
  })

  return {
    formik
  }
}