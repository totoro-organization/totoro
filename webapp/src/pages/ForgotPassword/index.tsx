import { Container } from '@mui/material';
import ForgotPasswordForm from 'src/components/ForgotPasswordForm';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 8
};

function ForgotPassword() {
  return (
    <Container sx={containerStyles} component="main" maxWidth="sm">
      <ForgotPasswordForm />
    </Container>
  );
}

export default ForgotPassword;
