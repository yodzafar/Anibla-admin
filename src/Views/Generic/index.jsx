import React from 'react'
import ContentHeader from "../../Components/BodyHeader";
import {ContentContainer, ContentContainerInner} from "../../Components/GlobalStyles";
import {GenericItem, GenericWrapper} from "./style";
import Button from "../../Components/FormElements/Button";

export default () => {
  return (
    <>
      <ContentHeader/>
      <ContentContainer>
        <ContentContainerInner>
          <h3 style={{marginBottom: 12}}>Button Component</h3>
          <GenericWrapper>
            <GenericItem>
              <h4>Medium buttons</h4>
              <Button variantstyle='rounded' buttonstyle='primary'>Example</Button>
              <Button variantstyle='outline-rounded' buttonstyle='secondary'>Example</Button>
              <Button buttonstyle='success'>Example</Button>
              <Button buttonstyle='info'>Example</Button>
              <Button buttonstyle='warning'>Example</Button>
              <Button buttonstyle='danger'>Example</Button>
              <Button buttonstyle='light'>Example</Button>
              <Button buttonstyle='dark'>Example</Button>
              <Button buttonstyle='link'>Example</Button>
            </GenericItem>
          </GenericWrapper>
        </ContentContainerInner>

      </ContentContainer>
    </>
  )
}