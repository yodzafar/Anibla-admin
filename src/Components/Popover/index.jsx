import React from 'react'
import Popover from "@material-ui/core/Popover";
import {PopoverChildren, PopoverContainer, PopoverContent, PopoverContentItem} from "./style";

export default ({children, popoverData, itemId}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    setAnchorEl(null);
    action()
  }

  return (
    <PopoverContainer>
      <PopoverChildren onClick={handleClick}>
        {
          children
        }
      </PopoverChildren>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <PopoverContent>
          {
            popoverData && popoverData.length > 0 && popoverData.map(item => (
              <PopoverContentItem
                key={item.id}
                onClick={() => handleAction(() => itemId ? item.onClick(itemId) : item.onClick())}
                divider={item.divider}
                remove={item.id === 'delete'}
              >
                {item.icon}
                <span>{item.title}</span>
              </PopoverContentItem>
            ))
          }
        </PopoverContent>
      </Popover>
    </PopoverContainer>
  )
}