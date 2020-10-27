import React from 'react'
import LockIcon from 'mdi-react/LockIcon'
import { AuthFormBlock, FormGrid, ResetPasswordText } from '../style';
import { NormalInput, PasswordInput } from '../../../Components/FormElements/Inputs'
import { useAuth } from '../../../Hooks/auth/use-auth';
import Button from '../../../Components/FormElements/Button'

export default () => {
  const { formik } = useAuth()
  return (
    <AuthFormBlock onSubmit={formik.handleSubmit}>
      <AuthFormBlock.Heading>
        Sistemaga kirish!
      </AuthFormBlock.Heading>
      <FormGrid>
        <NormalInput
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={(e) => formik.setFieldValue('email', e, true)}
          error={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
        />
        <PasswordInput
          label="Parol"
          name="password"
          value={formik.values.password}
          onChange={(e) => formik.setFieldValue('password', e, true)}
          error={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
        />
      </FormGrid>
      <ResetPasswordText>
        <LockIcon size={15} />
        {' '}
        parolni tiklash
      </ResetPasswordText>
      <Button
        buttonstyle="primary"
        type="submit"
        disabled={formik.isSubmitting
        || (formik.touched.email && !!formik.errors.email)
        || (formik.touched.password && !!formik.errors.password)}
      >
        Kirish
      </Button>
    </AuthFormBlock>
  )
}
