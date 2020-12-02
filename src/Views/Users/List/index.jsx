import React from 'react'
import ContentHeader from '../../../Components/BodyHeader';
import { ContentContainer } from '../../../Components/GlobalStyles';
import {UsersTable} from '../../../Components/Users'

export default () => {
    return (
        <>
            <ContentHeader />
            <ContentContainer>
                <UsersTable />
            </ContentContainer>
        </>
    )
}
