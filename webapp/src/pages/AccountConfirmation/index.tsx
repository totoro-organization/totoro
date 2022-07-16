import { Box, Button, Container, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmationIllustration from './Illustration';

const Content = styled(Box)(
    ({ theme }) => `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          row-gap: ${theme.spacing(8)};
          height: 100%;
          width: 100%;
          @media (min-width: ${theme.breakpoints.values.lg}px) {
              flex-direction: row;
              column-gap: ${theme.spacing(8)};
          }
  `
  );

function AccountConfirmation() {
  return (
    <Container sx={{ height: '100%'}} component="main" maxWidth="md">
      <Content>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box display="flex" flexDirection="column" rowGap={4}>
            <Typography component="h1" variant="h2">
              Vérifie tes mails et active ton compte pour commencer
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              Oups ! On dirait que ton compte n'a pas encore été activé. Pour se
              faire je t'invite à cliquer sur le lien qui t'as été envoyé par
              mail.
            </Typography>
          </Box>
          <Button to="/login" component={Link} sx={{width: 'fit-content'}} variant="contained" color="primary">
            Ok, c'est fait !
          </Button>
        </Box>
        <ConfirmationIllustration />
      </Content>
    </Container>
  );
}

export default AccountConfirmation;
