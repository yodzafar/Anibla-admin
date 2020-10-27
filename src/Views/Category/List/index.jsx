import React from 'react'
import PlusIcon from 'mdi-react/PlusIcon';
import { useDispatch } from 'react-redux';
import ContentHeader from '../../../Components/BodyHeader';
import Button from '../../../Components/FormElements/Button';
import { ContentContainer } from '../../../Components/GlobalStyles';
import { CategoryForm, CategoryTable } from '../../../Components/Category';
import { showModal } from '../../../Models/site';
import { URL_TITLE } from '../../../Constants/url';

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
          buttonstyle="light"
          variantstyle="rounded"
          onClick={() => dispatch(showModal(payload))}
        >
          <PlusIcon size={16} />
          {URL_TITLE.CATEGORY.TITLE_ADD}
        </Button>
      </ContentHeader>
      <ContentContainer>
        <CategoryTable />
      </ContentContainer>
    </>
  )
}
