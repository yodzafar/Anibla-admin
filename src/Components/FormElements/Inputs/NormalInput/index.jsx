/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';
import { StyledFormControl, StyledInput, StyledLabel } from '../style';

export default ({
  value, error, label, onChange, ...props
}) => (
  <StyledFormControl error={!!error} variant="outlined">
    <StyledLabel>{label}</StyledLabel>
    <StyledInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
    <FormHelperText>{error}</FormHelperText>
  </StyledFormControl>
)
