import React from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ContentHeader from '../../../Components/BodyHeader'
import { ContentContainer } from '../../../Components/GlobalStyles'
import { URL_TITLE } from '../../../Constants/url'
import { showModal } from '../../../Models/app'
import Button from '../../../Components/FormElements/Button'
import { SeriyaForm, SeriyaTable } from '../../../Components/Seriya'

export default () => {
    const { filmId, seasonId } = useParams()
    const dispatch = useDispatch()

    const payload = {
        open: true,
        component: <SeriyaForm maxWidth="md" seasonId={seasonId} filmId={filmId} />,
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
                        URL_TITLE.SERIYA.TITLE_ADD
                    }
                </Button>
            </ContentHeader>
            <ContentContainer>
                <SeriyaTable seasonId={seasonId} filmId={filmId} />
            </ContentContainer>
        </>
    )
}
