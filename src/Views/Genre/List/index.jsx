import {useHistory} from "react-router-dom";
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {ContentContainer} from "../../../Components/GlobalStyles";
import React from "react";
import {ROUTE_URL, URL_TITLE} from "../../../Constants/url";
import {GenreTable} from '../../../Components/Genre'

export default () => {
  const {push} = useHistory()
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle='light'
          variantstyle='rounded'
          onClick={() => push(ROUTE_URL.GENRE.ADD)}
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