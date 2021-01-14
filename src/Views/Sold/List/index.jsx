import React from 'react'
import ContentHeader from "../../../Components/BodyHeader";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {SoldTable} from "../../../Components/Sold";

export default () => {
    return (
        <>
            <ContentHeader/>
            <ContentContainer>
                <SoldTable/>
            </ContentContainer>
        </>
    )
}