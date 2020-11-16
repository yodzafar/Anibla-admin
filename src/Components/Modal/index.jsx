import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { hideModal } from '../../Models/app';

export const AppModal = () => {
  const modal = useSelector(({ app }) => app.modal)
  const dispatch = useDispatch()
  const { props, open, component } = modal

  return (
    <Dialog
      open={!!open}
      onClose={() => dispatch(hideModal())}
      maxWidth={props && props.maxWidth ? props.maxWidth : 'sm'}
    >
      {
        component && component
      }
    </Dialog>
  )
}
