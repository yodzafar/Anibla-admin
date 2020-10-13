import React from 'react'
import {
  BurgerButton,
  LogoLink,
  NavbarActionWrapper,
  NavbarWrapper
} from "./style";
import BackBurgerIcon from 'mdi-react/BackburgerIcon';
import LogoBrand from "../Logo";
import Avatar from './Avatar'

export default () => {

  return (
    <NavbarWrapper>
      <LogoLink to='/'>
        <LogoBrand/>
      </LogoLink>
      <NavbarActionWrapper>
        <BurgerButton>
          <BackBurgerIcon color='#fff'/>
        </BurgerButton>
        <Avatar/>
      </NavbarActionWrapper>
    </NavbarWrapper>
  )
}