import Container from '@mui/material/Container';
import Copyright from 'src/components/Copyright';
import SignupForm from 'src/components/SignupForm';
import AuthLogo from 'src/components/AuthLogo';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 8
};

export default function SignUp() {
  return (
    <Container sx={containerStyles} component="main" maxWidth="sm">
      <AuthLogo />
      <SignupForm />
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
