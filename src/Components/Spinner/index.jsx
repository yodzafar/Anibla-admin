import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";
import {SpinnerContainer} from "./style";

export default ({size}) => {
  return (
    <SpinnerContainer>
      <CircularProgress size={size || 18}/>
    </SpinnerContainer>
  )
}