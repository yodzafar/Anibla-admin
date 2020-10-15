import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../Models/site";
import Dialog from "@material-ui/core/Dialog";

export const SiteModal = () => {
  const modal = useSelector(({site}) => site.modal)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={!!modal.open}
      onClose={() => dispatch(hideModal())}
    >
      {
        modal.component && modal.component
      }
    </Dialog>
  )
}