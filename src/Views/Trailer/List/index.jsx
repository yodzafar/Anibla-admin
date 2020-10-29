import React from 'react';
import { useDispatch } from 'react-redux';
import PlusIcon from 'mdi-react/PlusIcon';
import ContentHeader from '../../../Components/BodyHeader';
import Button from '../../../Components/FormElements/Button';
import { ContentContainer } from '../../../Components/GlobalStyles';
import { URL_TITLE } from '../../../Constants/url';
import { TrailerForm } from '../../../Components/Trailer';
import { showModal } from '../../../Models/site';
import TrailerTable from '../../../Components/Trailer/TrailerTable';

export default () => {
  const dispatch = useDispatch()
  const payload = {
    open: true,
    component: <TrailerForm maxWidth="md" type="treyler" />,
    props: { maxWidth: 'md' }
  }
  return (
    <>
      <ContentHeader>
        <Button
          buttonstyle="light"
          variantstyle="rounded"
          onClick={() => dispatch(showModal(payload))}
        >
          <PlusIcon size={16} />
          {
            URL_TITLE.TRAILER.TITLE_ADD
          }
        </Button>
      </ContentHeader>
      <ContentContainer>
        <TrailerTable />
      </ContentContainer>
    </>
  )
}
