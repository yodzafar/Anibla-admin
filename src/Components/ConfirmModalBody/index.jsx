/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useDispatch } from 'react-redux'
import InformationCircleOutlineIcon from 'mdi-react/InformationCircleOutlineIcon'
import { hideModal } from '../../Models/site'
import Button from '../FormElements/Button'
import { ButtonWrapper } from '../GlobalStyles'
import { ConfirmContainer, ConfirmContentBody } from './style'

export const ConfirmBody = ({ onAction, ...props }) => {
  const dispatch = useDispatch()
  return (
    <ConfirmContainer {...props}>
      <ConfirmContentBody>
        <InformationCircleOutlineIcon size="72" />
        <h2>Ishonchingiz komilmi?</h2>
        <p>O'chirilgandan so'ng, siz ushbu ma'lumotlarni tiklay olmaysiz!</p>
      </ConfirmContentBody>
      <ButtonWrapper>
        <Button
          type="button"
          buttonstyle="danger"
          onClick={() => dispatch(hideModal())}
        >
          Bekor qilish
        </Button>
        <Button
          type="submit"
          buttonstyle="primary"
          onClick={onAction}
        >
          Tasdiqlash
        </Button>
      </ButtonWrapper>
    </ConfirmContainer>
  )
}
