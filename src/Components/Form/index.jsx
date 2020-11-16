import React from 'react'
import CloseIcon from 'mdi-react/CloseIcon';
import { useDispatch } from 'react-redux';
import {
  FormClose, FormHeading, FormTitle, FormWrapper
} from './style';
import { hideModal } from '../../Models/app';

export const Form = ({ title, children, maxWidth }) => {
  const dispatch = useDispatch()
  return (
    <FormWrapper maxWidth={maxWidth}>
      <FormHeading>
        <FormTitle>
          {title}
        </FormTitle>
        <FormClose onClick={() => dispatch(hideModal())}>
          <CloseIcon />
        </FormClose>
      </FormHeading>
      {
        children
      }
    </FormWrapper>
  )
}
