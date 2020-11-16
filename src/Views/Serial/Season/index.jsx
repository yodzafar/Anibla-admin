import React from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ContentHeader from '../../../Components/BodyHeader'
import { ContentContainer } from '../../../Components/GlobalStyles'
import { URL_TITLE } from '../../../Constants/url'
import { showModal } from '../../../Models/app'
import Button from '../../../Components/FormElements/Button'
import { SeasonForm, SeasonTable } from '../../../Components/Season'

export default () => {
  const { filmId } = useParams()
  const dispatch = useDispatch()

  const payload = {
    open: true,
    component: <SeasonForm maxWidth="md" filmId={filmId} />,
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
            URL_TITLE.SEASON.TITLE_ADD
          }
        </Button>
      </ContentHeader>
      <ContentContainer>
        <SeasonTable filmId={filmId} />
      </ContentContainer>
    </>
  )
}
