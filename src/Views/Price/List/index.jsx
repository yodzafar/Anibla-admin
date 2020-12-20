import React from 'react'
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {URL_TITLE} from "../../../Constants/url";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {PriceForm, PriceTable} from "../../../Components/Price";
import {useDispatch} from "react-redux";
import {showModal} from "../../../Models/app";

export default () => {
    const dispatch = useDispatch()
    const payload = {
        open: true,
        component: <PriceForm />,
        props: null
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
                    {
                        URL_TITLE.PRICE.TITLE_ADD
                    }
                </Button>
            </ContentHeader>
            <ContentContainer>
                <PriceTable />
            </ContentContainer>
        </>
    )
}