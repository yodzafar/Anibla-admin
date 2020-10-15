import React from 'react'
import {FormClose, FormHeading, FormTitle, FormWrapper} from "./style";
import CloseIcon from "mdi-react/CloseIcon";
import {useDispatch} from "react-redux";
import {hideModal} from "../../Models/site";

export const Form = ({title, children}) => {
  const dispatch = useDispatch()
  return (
    <FormWrapper>
      <FormHeading>
        <FormTitle>
          {title}
        </FormTitle>
        <FormClose onClick={() => dispatch(hideModal())}>
          <CloseIcon/>
        </FormClose>
      </FormHeading>
      {
        children
      }
    </FormWrapper>
  )
}