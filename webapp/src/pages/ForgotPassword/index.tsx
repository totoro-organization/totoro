import { Container, styled, Typography } from '@mui/material';
import ForgotPasswordForm from 'src/components/ForgotPasswordForm';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 4,
  height: '100%'
};

const Heading = styled("div")({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 8,
})

function ForgotPassword() {
  return (
    <Container sx={containerStyles} component="main" maxWidth="sm">
      <Heading>
        <Typography component="h1" variant="h2">
        Oublier son mot de passe ça arrive même aux meilleurs !
      </Typography>
      <Typography component="h5" variant="subtitle1">
       Ne t'en fais pas, donne moi ton email et si il correspond à un compte utilisateur, tu recevras un mail de confirmation sur la boîte mail associée.
      </Typography>
      </Heading>
      
      <ForgotPasswordForm />
    </Container>
  );
}

export default ForgotPassword;
