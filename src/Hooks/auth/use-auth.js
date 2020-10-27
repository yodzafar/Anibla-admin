import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import auth from '../../Service/auth';
import { login } from '../../Models/auth';

export const useAuth = () => {
  const dispatch = useDispatch()
  const validationSchema = new Yup.object().shape({
    email: Yup.string().required('Maydon to\'ldirilishi shart').email('Xato elektron pochta'),
    password: Yup.string().required('Maydon to\'ldirilishi shart')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: ((values, { setSubmitting }) => {
      setSubmitting(true)
      auth.getToken(values)
        .then((res) => {
          if (res.success) {
            dispatch(login(res.token))
          }
        }).finally(() => setSubmitting(false))
    })
  })

  return {
    formik
  }
}
