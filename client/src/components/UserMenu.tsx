import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User } from '../models/User';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { History, Logout, Person } from '@mui/icons-material';
import { useLogoutMutation } from '../api/accountApi';

type Props = {
  user: User;
};

export default function UserMenu(prop: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color="inherit"
        size='large'
        sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold', textTransform: 'none' }}
      >
        {prop.user.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          logout();
          handleClose();
        }}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
