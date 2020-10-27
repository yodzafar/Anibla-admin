import React from 'react'
import Spinner from '../Spinner'
import { StyledAvatar } from './style';

export default ({ imgUrl, name, size }) => (
  <>
    {
      (imgUrl || name)
        ? (
          <StyledAvatar
            size={size}
            alt={name}
            src={imgUrl}
          />
        )
        : (
          <StyledAvatar
            size={size}
          >
            <Spinner />
          </StyledAvatar>
        )
    }
  </>

)
