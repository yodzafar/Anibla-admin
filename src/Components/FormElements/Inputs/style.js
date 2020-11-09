import styled from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  Chip,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

export const StyledInput = styled(OutlinedInput)`
  && {
    input {
      padding: 13px 16px;
      font-family: 'Nunito', sans-serif;
      color: #495057;
      font-size: 14px;
      min-height: 24px;
    }
  }
`

export const StyledLabel = styled(InputLabel)`
  && {
      transform: translate(14px, 15px) scale(1);
      background-color: ${({ bg }) => (bg === '0' ? 'unset' : '#fff')};
      padding: 2px 4px;
      font-family: 'Nunito', sans-serif;
      color: #7c8a96;
  }
`

export const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    
    .MuiInputBase-root.Mui-disabled{
      background-color: #e4e1e1;
    }
  }
`

export const StyledSelect = styled(Select)`
  &&{
    .MuiOutlinedInput-input{
      padding: 13px 16px;
      height: 24px;
    }
  }
`;

export const OptionLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;

  img {
    max-width: 50px;
    height: auto;
  }
`;

export const StyledOptionItem = styled(MenuItem)`
  && {
    font-size: 14px;
    font-family: "Nunito", sans-serif;
    font-weight: 500;
    
    &:hover {
      color: var(--primary);
    }
  }
`

export const MultipleSelectedWrap = styled.div`
  display: flex;
  align-items: center;
`

export const StyledChip = styled(Chip)`
  && {
    height: 25px;
    margin: 0 4px 2px 0
  }
`
