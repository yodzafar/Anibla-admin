import PlusIcon from 'mdi-react/PlusIcon';
import React from 'react';
import { useDispatch } from 'react-redux';
import ContentHeader from '../../../Components/BodyHeader';
import Button from '../../../Components/FormElements/Button';
import { ContentContainer } from '../../../Components/GlobalStyles';
import { URL_TITLE } from '../../../Constants/url';
import { FilmForm, FilmTable } from '../../../Components/Film';
import { showModal } from '../../../Models/site';

export default () => {
  const dispatch = useDispatch()
  const payload = {
    open: true,
    component: <FilmForm maxWidth="md" />,
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
            URL_TITLE.FILM.TITLE_ADD
          }
        </Button>
      </ContentHeader>
      <ContentContainer>
        <FilmTable />
      </ContentContainer>
    </>
  )
}
