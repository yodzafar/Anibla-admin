import React from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import { useDispatch } from 'react-redux'
import ContentHeader from '../../../Components/BodyHeader'
import { ContentContainer } from '../../../Components/GlobalStyles'
import { SerialForm, SerialTable } from '../../../Components/Serial'
import { URL_TITLE } from '../../../Constants/url'
import { showModal } from '../../../Models/site'
import Button from '../../../Components/FormElements/Button'

export default () => {
  const dispatch = useDispatch()
  const payload = {
    open: true,
    component: <SerialForm maxWidth="md" type="serial" />,
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
            URL_TITLE.SERIAL.TITLE_ADD
          }
        </Button>
      </ContentHeader>
      <ContentContainer>
        <SerialTable />
      </ContentContainer>
    </>
  )
}
