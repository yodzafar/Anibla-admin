import React from 'react'
import ContentHeader from "../../../Components/BodyHeader/";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {CommentsTable} from "../../../Components/Comments";

export default () => {
    return (
        <>
            <ContentHeader/>
            <ContentContainer>
                <CommentsTable />
            </ContentContainer>
        </>
    )
}