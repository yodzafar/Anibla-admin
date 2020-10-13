import React, {Fragment} from 'react'
import {Menu, MenuItem, SidebarContainer} from "./style";
import menus from '../../Routes'

export default () => {
  return (
    <SidebarContainer>
      <Menu>
        {
          menus.map(menu => {
            const Icon = menu.icon
            return (
              <Fragment key={menu.id}>
                {
                  !menu.hidden
                  && (
                    <MenuItem to={menu.path} >
                      <Icon/>
                      <MenuItem.Title>
                        {menu.title}
                      </MenuItem.Title>
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