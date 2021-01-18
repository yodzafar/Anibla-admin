import styled from "styled-components"
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #3051d3;
  z-index: 100;
  color: #fff;
  height: var(--navbar-height);
`

export const LogoLink = styled(Link)`
  transition: .2s ease all;
  width: var(${({minisidebar}) => Boolean(minisidebar) ? '--mini-sidebar-width' : '--sidebar-width'});
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #dfe4ec;
  }
`

export const BurgerButton = styled(Button)`
  && {
    min-width: 56px;
    height: 100%;
    text-transform: unset;
    transform: scaleX(${({minisidebar}) => Boolean(minisidebar) ? -1 : 1});
  }
`

export const NavbarActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 15px;
  flex-grow: 1;
`




