import React from 'react'
import {useDispatch} from 'react-redux';
import {ButtonWrapper, Grid, SectionForm} from '../../GlobalStyles';
import Button from '../../FormElements/Button';
import {Form} from '../../Form';
import {hideModal} from '../../../Models/app';
import {useUserForm} from "../../../Hooks/users";
import UserRoleForm from './UserRole'

export default ({id, type}) => {
    const {formik} = useUserForm(id)
    const dispatch = useDispatch()

    const getForm = () => {
        switch (type) {
            case 'role':
                return <UserRoleForm formik={formik}/>
            default:
                return 1
        }
    }

    return (
        <Form title="Foylanuvchi rolini o'zgartirish">
            <SectionForm onSubmit={formik.handleSubmit}>
                <Grid>
                    {
                        getForm()
                    }
                </Grid>
                <ButtonWrapper>
                    <Button
                        type="button"
                        buttonstyle="danger"
                        onClick={() => dispatch(hideModal())}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        type="submit"
                        buttonstyle="primary"
                        disabled={
                            formik.isSubmitting
                            || (formik.touched.nameru && !!formik.errors.nameru)
                            || (formik.touched.nameuz && !!formik.errors.nameuz)
                        }
                    >
                        Saqlash
                    </Button>
                </ButtonWrapper>
            </SectionForm>
        </Form>
    )
}
