import React from 'react';
import {ButtonWrapper, SectionForm} from '../../GlobalStyles';
import {Form} from '../../Form';
import {URL_TITLE} from "../../../Constants/url";
import FirstStep from './FitstStep'
import SecondStep from "./SecondStep";
import Button from "../../FormElements/Button";
import {hideModal} from "../../../Models/app";
import {useDispatch} from "react-redux";

export default (props) => {
    const {
        formik,
        maxWidth,
        type,
        id,
        step,
        submitDisabled,
        allowNextStep,
        nextStep,
        ...otherProps
    } = props

    const dispatch = useDispatch

    const getTitle = () => {
        switch (type) {
            case 'treyler':
                return URL_TITLE.TRAILER.TITLE
            case 'serial':
                return URL_TITLE.SERIAL.TITLE
            default:
                return URL_TITLE.FILM.TITLE
        }
    }

    return (
        <Form title={`${getTitle()} qo'shish`} maxWidth={maxWidth}>
            <SectionForm onSubmit={formik.handleSubmit}>
                {
                    !id && step === 2
                        ? <SecondStep
                            formik={formik}
                            {...otherProps}
                        />
                        : (
                            <FirstStep
                                formik={formik}
                                id={id}
                                type={type}
                                step={step}
                                {...otherProps}
                            />
                        )
                }
                <ButtonWrapper>
                    <Button
                        type="button"
                        buttonstyle="danger"
                        onClick={() => dispatch(hideModal())}
                    >
                        Bekor qilish
                    </Button>
                    {
                        !id && step === 1
                        && (
                            <Button
                                type="button"
                                buttonstyle="primary"
                                disabled={allowNextStep}
                                onClick={nextStep}
                            >
                                Keyingi
                            </Button>
                        )
                    }

                    {
                        ((id && step === 1) || step === 2)
                        && (
                            <Button
                                type="submit"
                                buttonstyle="primary"
                                disabled={submitDisabled()}
                            >
                                Saqlash
                            </Button>
                        )
                    }

                </ButtonWrapper>
            </SectionForm>
        </Form>
    )
}
