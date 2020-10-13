import React from 'react'
import {StyledButton} from "./style";
import Proptypes from 'prop-types'

const Button = ({children, buttonstyle, variantstyle, ...props}) => {
  return (
    <StyledButton
      buttonstyle={buttonstyle}
      variantstyle={variantstyle}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  buttonstyle: Proptypes.string
}

Button.defaultProps = {
  buttonstyle: 'primary'
}

export default Button
