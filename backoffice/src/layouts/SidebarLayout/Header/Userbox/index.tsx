import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import useSession from 'src/hooks/useSession';
import FallbackAvatar from 'src/components/FallbackAvatar';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {

  const { user, logout } = useSession();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const userFullname = `${user.firstname} ${user.lastname}`;

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <FallbackAvatar fallback={userFullname} variant="circular" alt={user.username} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{userFullname}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <FallbackAvatar fallback={userFullname} variant="circular" alt={user.username} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.username}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            to="/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button onClick={logout} color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
