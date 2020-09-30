import React from 'react'
import {AvatarText, AvatarWrapper, BurgerButton, DownIcon, Logo, NavbarActionWrapper, NavbarWrapper} from "./style";
import BackBurgerIcon from 'mdi-react/BackburgerIcon';
import Avatar from "@material-ui/core/Avatar";
import avatarImg from '../../Assets/images/avatar.png'
import Popover from '../Popover'

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  console.log(anchorEl);
  return (
    <NavbarWrapper>
      <Logo to='/'>
        <Logo.Brand>
          AniBla.uz
          <div>
            Birinchi <span>UZ</span>fandab
          </div>
        </Logo.Brand>
      </Logo>
      <NavbarActionWrapper>
        <BurgerButton>
          <BackBurgerIcon color='#fff'/>
        </BurgerButton>
        <AvatarWrapper aria-describedby={id} onClick={handleClick}>
          <Avatar alt="Remy Sharp" src={avatarImg} />
          <AvatarText>Zafar</AvatarText>
          <DownIcon
            size={16}
          />
        </AvatarWrapper>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </NavbarActionWrapper>
    </NavbarWrapper>
  )
}