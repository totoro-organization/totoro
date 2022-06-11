import { Box } from '@mui/material';
import HeaderNotifications from './Notifications';

function HeaderButtons() {
  return (
      <Box sx={{ mx: .5 }} component="span">
        <HeaderNotifications />
      </Box>
  );
}

export default HeaderButtons;
