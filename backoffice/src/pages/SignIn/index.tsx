import { Container } from '@mui/material';
import AuthLogo from 'src/components/AuthLogo';
import Copyright from 'src/components/Copyright';
import SigninForm from 'src/components/SigninForm';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 8
};

export default function SignIn() {
  return (
    <Container sx={containerStyles} component="main" maxWidth="xs">
      <AuthLogo />
      <SigninForm />
      <Copyright />
    </Container>
  );
}
