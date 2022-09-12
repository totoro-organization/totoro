import { Box } from '@mui/material';

function AuthLogo() {
  // const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img
        style={{ width: "100%"}}
        alt="BTC"
        src="/static/images/logo/totoro-logo.svg"
      />
    </Box>
  );
}

export default AuthLogo;
