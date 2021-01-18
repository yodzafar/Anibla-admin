import React, {Fragment} from 'react'
import {Menu, MenuItem, SidebarContainer} from './style';
import menus from '../../Routes'
import {useSelector} from "react-redux";


export default () => {
    const {miniSidebar} = useSelector(({app}) => app)

    return (
        <SidebarContainer minisidebar={miniSidebar ? 1 : 0}>
            <Menu>
                {
                    menus.map((menu) => {
                        const Icon = menu.icon
                        return (
                            <Fragment key={menu.id}>
                                {
                                    !menu.hidden
                                    && (
                                        <MenuItem
                                            to={menu.path}
                                            minisidebar={miniSidebar ? 1 : 0}
                                        >
                                            <Icon/>
                                            {
                                                !miniSidebar
                                                && (
                                                    <MenuItem.Title>
                                                        {menu.title}
                                                    </MenuItem.Title>
                                                )
                                            }
                                        </MenuItem>
                                    )
                                }
                            </Fragment>
                        )
                    })
                }
            </Menu>
        </SidebarContainer>
    )
}
