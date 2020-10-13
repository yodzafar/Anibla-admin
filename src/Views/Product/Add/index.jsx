import React from 'react'
import BodyHeader from '../../../Components/BodyHeader'
import {CategoryForm} from '../../../Components/Category'
import {ContentContainer} from "../../../Components/GlobalStyles";

export default () => {
  return (
    <>
      <BodyHeader/>
      <ContentContainer>
        <CategoryForm />
      </ContentContainer>
    </>
  )
}