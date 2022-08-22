import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';

interface MenuOption {
  value: string,
  name?: string,
  link?: string
}

interface LongMenuProps {
  options?: MenuOption[],
}

export default function LongMenu({ options }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenuItem = (option: MenuOption) => {
      handleClose();
      if(option.link) navigate(option.link);
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options && options.map((option) => (
          <MenuItem key={option.value} onClick={ () => handleClickMenuItem(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
