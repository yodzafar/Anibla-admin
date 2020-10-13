import React, {useState} from 'react'
import {StyledInput, StyledLabel} from "../style";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import EyeIcon from 'mdi-react/EyeIcon'
import {FormControl} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

export default ({value, error, label, onChange, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl error={!!error} variant={"outlined"}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <EyeIcon/> : <EyeIcon/>}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}