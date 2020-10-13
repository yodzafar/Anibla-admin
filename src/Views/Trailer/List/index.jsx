import {useHistory} from "react-router-dom";
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {ContentContainer} from "../../../Components/GlobalStyles";
import React from "react";

export default () => {
  const {push} = useHistory()
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle='light'
          variantstyle='rounded'
          onClick={() => push('/stuff/add')}
        >
          <PlusIcon size={16}/>
          Hodim qo'shish
        </Button>
      </ContentHeader>
      <ContentContainer>
      </ContentContainer>
    </>
  )
}