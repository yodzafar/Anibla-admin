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

export const StyledCommonFileInput = styled.input.attrs({type: 'file'})`
      width: 147px;
      overflow: hidden;
      outline: none;
      
       &::-webkit-file-upload-button {
        visibility: hidden;
      }
  
    &::before {
      content: 'Rasm yuklash';
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      font-weight: 700;
      width: 102px;
      height: 28px;
      padding: 11px 22px;
      text-transform: unset;
      font-size: 15px;
      font-family: 'Nunito',sans-serif;
      color: #fff;
      background-color: var(--primary);
      border-color: var(--primary);
      border-radius: 0 6px 6px 0;
    }
  
`