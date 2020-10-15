import React from 'react'
import BodyHeader from '../../../Components/BodyHeader'
import {ContentContainer} from "../../../Components/GlobalStyles";
import {GenreForm} from "../../../Components/Genre";

export default () => {
  return (
    <>
      <BodyHeader/>
      <ContentContainer>
        <GenreForm />
      </ContentContainer>
    </>
  )
}