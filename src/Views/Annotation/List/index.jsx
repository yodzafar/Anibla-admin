import React from 'react'
import PlusIcon from 'mdi-react/PlusIcon';
import { useDispatch } from 'react-redux';
import ContentHeader from '../../../Components/BodyHeader';
import Button from '../../../Components/FormElements/Button';
import { ContentContainer } from '../../../Components/GlobalStyles';
import { showModal } from '../../../Models/app';
import { URL_TITLE } from '../../../Constants/url';
import {AnnotationForm, AnnotationTable} from "../../../Components/Annotation";

export default () => {
    const dispatch = useDispatch()
    const payload = {
        open: true,
        component: <AnnotationForm maxWidth='md' />,
        props: {maxWidth: 'md'}
    }
    return (
        <>
            <ContentHeader>
                <Button
                    buttonstyle="light"
                    variantstyle="rounded"
                    onClick={() => dispatch(showModal(payload))}
                >
                    <PlusIcon size={16} />
                    {URL_TITLE.ANNOTATION.TITLE_ADD}
                </Button>
            </ContentHeader>
            <ContentContainer>
                <AnnotationTable />
            </ContentContainer>
        </>
    )
}
