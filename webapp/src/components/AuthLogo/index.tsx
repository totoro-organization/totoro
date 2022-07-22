import { Avatar, Box, Typography, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function AuthLogo() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: theme.colors.primary.main }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        S'inscrire
      </Typography>
    </Box>
  );
}

export default AuthLogo;
