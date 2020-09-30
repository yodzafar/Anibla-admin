import styled from "styled-components"
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

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

export const Logo = styled(Link)`
  width: var(--sidebar-width);
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
`

Logo.Brand = styled.div`
  font-size: 24px;
  font-family: var(--brand-font-family);
  div {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    font-size: 12px;
    
    span {
      font-weight: 500;
    }
  }
`

export const BurgerButton = styled(Button)`
  && {
    min-width: 56px;
    height: 100%;
    text-transform: unset;
  }
`

export const NavbarActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 15px;
  flex-grow: 1;
`

export const AvatarWrapper = styled(BurgerButton)`
  && {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`

export const DownIcon = styled(ChevronDownIcon)`
  && {
    color: #fff;
  }
`
export const AvatarText = styled.div`
  color: #fff;
  margin: 0 8px;
`



