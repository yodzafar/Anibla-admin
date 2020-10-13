import React from 'react'
import noData from '../../Assets/images/no-data.png'
import {EmptyContainer} from "./style";

export const EmptyData = () => {
  return (
    <EmptyContainer>
      <img src={noData} alt="no-data"/>
    </EmptyContainer>
  )
}