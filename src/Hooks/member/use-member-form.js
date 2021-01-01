import {useFormik} from 'formik';
import {useCallback, useEffect, useState} from 'react';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import member from '../../Service/member';
import {getMemberList} from '../../Models/member';
import {imageExtValidate} from '../../utils/ext-validate';
import {hideModal, showSnackbar} from "../../Models/app/actions";
import {URL_TITLE} from "../../Constants/url";

export const useMemberForm = ({id}) => {
    const dispatch = useDispatch()
    const members = useSelector(({member}) => member)
    const [initialValues, setInitialValues] = useState({
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

    const createMember = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        member.createMember(data)
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
    }, [dispatch])

    const updateMember = useCallback((data, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        member.updateMember({id, data})
            .then(() => {
                const payload = {
                    open: true,
                    variant: 'success',
                    message: `${URL_TITLE.MEMBER.TITLE} muvaffaqiyatli tahrirlandi`
                }
                dispatch(showSnackbar(payload))
                dispatch(getMemberList())
                dispatch(hideModal())
                resetForm()
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
    }, [id, dispatch])

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: ({name, file}, actions) => {

            if(id) {
                updateMember({name}, actions)

            }else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('file', file)
                createMember(formData, actions)
            }

        }
    })

    const getMember = useCallback(() => {
        if (id) {
            const member = members.data.find(item => item._id === id)
            setInitialValues({
                name: member.name,
                file: member.image
            })
        }
    }, [id, members])

    useEffect(() => {
        getMember()
    }, [getMember])

    return {
        formik,
    }
}
