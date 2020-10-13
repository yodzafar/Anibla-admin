import React from "react";
import BodyHeader from "../../../Components/BodyHeader";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {CategoryForm} from "../../../Components/Category";

export default () => {
  return (
    <>
      <BodyHeader/>
      <ContentContainer>
        <CategoryForm/>
      </ContentContainer>
    </>
  )
}