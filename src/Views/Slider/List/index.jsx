import React from 'react';
import ContentHeader from '../../../Components/BodyHeader';
import { ContentContainer } from '../../../Components/GlobalStyles';
import {SliderTable} from "../../../Components/Slider";

export default () => {
    return (
        <>
            <ContentHeader />
            <ContentContainer>
                <SliderTable />
            </ContentContainer>
        </>
    )
}
