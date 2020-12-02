import React from 'react'
import {AuthFormBlock, FormGrid} from '../style';
import {NormalInput, PasswordInput} from '../../../Components/FormElements/Inputs'
import {useAuth} from '../../../Hooks/auth/use-auth';
import Button from '../../../Components/FormElements/Button'
import Alert from "@material-ui/lab/Alert";

export default () => {
    const {formik, error} = useAuth()
    return (
        <AuthFormBlock onSubmit={formik.handleSubmit}>
            <AuthFormBlock.Heading>
                Tizimga kirish!
            </AuthFormBlock.Heading>
            {
                error && (
                    <div style={{marginBottom: 24}}>
                        <Alert severity="error">{error}</Alert>
                    </div>
                )
            }
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
