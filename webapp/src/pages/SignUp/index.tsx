import Container from '@mui/material/Container';
import Copyright from 'src/components/Copyright';
import SignupForm from 'src/components/SignupForm';
import AuthLogo from 'src/components/AuthLogo';
import Paper from '@mui/material/Paper';
import { Box, CssBaseline, Grid } from '@mui/material';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 8
};

export default function SignUp() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container sx={containerStyles} component="main" maxWidth="xs">
            <AuthLogo />
            <SignupForm />
            <Copyright />
          </Container>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?registration)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}
