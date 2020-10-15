import React from 'react'
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {ContentContainer} from "../../../Components/GlobalStyles";
import {CategoryForm, CategoryTable} from "../../../Components/Category";
import {useDispatch} from "react-redux";
import {showModal} from "../../../Models/site";

export default () => {
  const dispatch = useDispatch()
  const payload = {
    open: true,
    component: <CategoryForm />,
    props: null
  }
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle='light'
          variantstyle='rounded'
          onClick={() => dispatch(showModal(payload))}
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