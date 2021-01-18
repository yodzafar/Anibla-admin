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
import {useDispatch, useSelector} from "react-redux";
import {changeMiniSidebarStatus} from "../../Models/app";

export default () => {
    const dispatch = useDispatch()
    const {miniSidebar} = useSelector(({app}) => app)

    return (
        <NavbarWrapper>
            <LogoLink minisidebar={miniSidebar ? 1 : 0} to='/'>
                <LogoBrand/>
            </LogoLink>
            <NavbarActionWrapper>
                <BurgerButton
                    onClick={() => dispatch(changeMiniSidebarStatus(!miniSidebar))}
                    minisidebar={miniSidebar ? 1 : 0} to='/'
                >
                    <BackBurgerIcon color='#fff'/>
                </BurgerButton>
                <Avatar/>
            </NavbarActionWrapper>
        </NavbarWrapper>
    )
}