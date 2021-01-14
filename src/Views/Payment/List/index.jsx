import React from 'react'
import ContentHeader from "../../../Components/BodyHeader";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {PaymentTable} from "../../../Components/Payment";

export default () => {
    return (
        <>
            <ContentHeader/>
            <ContentContainer>
                <PaymentTable/>
            </ContentContainer>
        </>
    )
}