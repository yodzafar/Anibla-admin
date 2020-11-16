import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {ContentContainer} from "../../../Components/GlobalStyles";
import React from "react";
import {URL_TITLE} from "../../../Constants/url";
import {GenreForm, GenreTable} from '../../../Components/Genre'
import {useDispatch} from "react-redux";
import {showModal} from "../../../Models/app";

export default () => {
  const dispatch = useDispatch()

  const payload = {
    open: true,
    component: <GenreForm />,
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
          {URL_TITLE.GENRE.TITLE_ADD}
        </Button>
      </ContentHeader>
      <ContentContainer>
        <GenreTable />
      </ContentContainer>
    </>
  )
}