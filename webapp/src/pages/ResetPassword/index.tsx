import { Container, styled, Typography } from '@mui/material';
import ResetPasswordForm from 'src/components/ResetPasswordForm';

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

function ResetPassword() {
  return (
    <Container sx={containerStyles} component="main" maxWidth="sm">
      <Heading>
        <Typography component="h1" variant="h2">
        Choisis un nouveau mot de passe
      </Typography>
      <Typography component="h5" variant="subtitle1">
       Ce mot de passe te permet de te connecter aux applications Totoro. Choisis le avec précaution !
      </Typography>
      </Heading>
      <ResetPasswordForm />
    </Container>
  );
}

export default ResetPassword;
