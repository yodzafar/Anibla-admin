import React from 'react'
import {StyledFormControl, StyledInput, StyledLabel} from "../style";
import FormHelperText from "@material-ui/core/FormHelperText";

export default ({value, error, label, onChange, ...props}) => (
  <StyledFormControl error={!!error} variant={"outlined"}>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput
      type={'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
    <FormHelperText>{error}</FormHelperText>
  </StyledFormControl>
)