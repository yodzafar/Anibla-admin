import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import Spinner from '../Spinner'

export default ({imgUrl, name}) => {
  return (
    <>
      {
        (imgUrl || name)
          ? <Avatar alt={name} src={imgUrl ? imgUrl : 'no-image'}/>
          : <Avatar>
          <Spinner />
          </Avatar>
      }
    </>

  )
}