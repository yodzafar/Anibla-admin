import {useHistory} from "react-router-dom";
import ContentHeader from "../../../Components/BodyHeader";
import Button from "../../../Components/FormElements/Button";
import PlusIcon from "mdi-react/PlusIcon";
import {ContentContainer} from "../../../Components/GlobalStyles";
import React from "react";
import {ROUTE_URL, URL_TITLE} from "../../../Constants/url";

export default () => {
  const {push} = useHistory()
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle='light'
          variantstyle='rounded'
          onClick={() => push(ROUTE_URL.STUFF.ADD)}
        >
          <PlusIcon size={16}/>
          {
            URL_TITLE.STUFF.TITLE_ADD
          }
        </Button>
      </ContentHeader>
      <ContentContainer>
      </ContentContainer>
    </>
  )
}