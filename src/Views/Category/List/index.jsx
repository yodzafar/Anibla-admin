import React from 'react'
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {useHistory} from 'react-router-dom'
import {ContentContainer} from "../../../Components/GlobalStyles";
import {CategoryTable} from "../../../Components/Category";

export default () => {
  const {push} = useHistory()
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle='light'
          variantstyle='rounded'
          onClick={() => push('/category/add')}
        >
          <PlusIcon size={16}/>
          Kategoriya qo'shish
        </Button>
      </ContentHeader>
      <ContentContainer>
        <CategoryTable/>
      </ContentContainer>
    </>
  )
}