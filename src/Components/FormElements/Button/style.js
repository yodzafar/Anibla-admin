import styled, { css } from 'styled-components';
import { Button } from '@material-ui/core';
import {
 BUTTON, getBorderRadius, getButtonBackground, getButtonColor, getButtonStyle
} from './style-helper';

const common = css`
  font-weight: 700;
  padding: 8px 18px;
  text-transform: unset;
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  border: 1px solid transparent;
`

const primary = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: var(--primary);
 
 &:hover {
   color: #fff;
   background-color: #2744b6;
   border-color: #2440ac;
 }
`

const success = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
 
 &:hover {
   color: #fff;
   background-color: #25ce85;
   border-color: #23c37e;
 }
`

const secondary = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
    color: #fff;
    background-color: #697783;
    border-color: #63707c
  }
`

const info = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
    color: #fff;
    background-color: #008bbb;
    border-color: #0081ae;
  }
`

const warning = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
    color: #fff;
    background-color: #d8be1d;
    border-color: #ccb41c;
  }
`

const danger = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
   color: #fff;
   background-color: #c82333;
   border-color: #c82333;
  }
`

const light = css`
  color: ${getButtonColor};
  background-color: #eff2f7;
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
    color: #212529;
    background-color: #d6ddea;
    border-color: #cdd6e6;
  }
`

const dark = css`
  color: ${getButtonColor};
  background-color: ${getButtonBackground};
  border-color: ${({ buttonstyle }) => getButtonBackground({ buttonstyle })};
  
  &:hover {
    color: #fff;
    background-color: #23272b;
    border-color: #1d2124;
  }
`

const link = css`
  color: #3051d3;
  background: none;
  
  &:hover {
    text-decoration: underline;
    background: none;
  }
`

const buttonStyles = {
  [BUTTON.PRIMARY]: primary,
  [BUTTON.SECONDARY]: secondary,
  [BUTTON.SUCCESS]: success,
  [BUTTON.INFO]: info,
  [BUTTON.WARNING]: warning,
  [BUTTON.DANGER]: danger,
  [BUTTON.LIGHT]: light,
  [BUTTON.DARK]: dark,
  [BUTTON.LINK]: link
}

export const StyledButton = styled(Button)`
  &&{
    ${common};
    ${(props) => getButtonStyle(props, buttonStyles)};
    border-radius: ${getBorderRadius}px;
    
    svg {
      margin-right: 8px;
    }
    
   &:disabled {
      background-color: #F5F5F5;
      color: #C4C4C4;
      border-color: #F5F5F5;
    }
  }
`
