import styled from "styled-components";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const StyledInput = styled(OutlinedInput)`
  && {
    input {
      padding: 13.5px 16px;
      font-family: 'Nunito', sans-serif;
      color: #495057;
      font-size: 14px;
    }
  }
`

export const StyledLabel = styled(InputLabel)`
  && {
      transform: translate(14px, 12px) scale(1);
      background-color: #fff;
      padding: 2px 4px;
      font-family: 'Nunito', sans-serif;
      color: #7c8a96;
  }
`

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`