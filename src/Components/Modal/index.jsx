/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { hideModal } from '../../Models/site';

export const SiteModal = () => {
  const modal = useSelector(({ site }) => site.modal)
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
