import styled from "styled-components";
import {StyledInput} from "../style";
import Button from "../../Button";

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const StyledFileInput = styled(StyledInput)`
  &&{
    flex-grow: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }
`

export const StyledFileUploadButton = styled(Button)`
  && {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`
export const ShowUploadedImg = styled.div`
  padding: 4px;
  position: absolute;
  top: 12px;
  right: 160px;
  z-index: 3;
  display: flex;
  align-items: center;
  color: #7c8a96;
  cursor: pointer;
`