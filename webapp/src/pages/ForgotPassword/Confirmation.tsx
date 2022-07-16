import { Box, Button, Container, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useDeviceDetect from 'src/hooks/useDeviceDetect';

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

function ForgotPasswordConfirmation() {
  return (
    <Content>
          <Box display="flex" flexDirection="column" rowGap={4}>
            <Typography component="h1" variant="h2">
              Vérifie tes mails pour réinitialiser ton mot de passe
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              Je t'invite à cliquer sur le lien qui t'as été envoyé par
              mail pour réinitialiser ton mot de passe.
            </Typography>
          </Box>
        {/* <ConfirmationIllustration /> */}
      </Content>
  )
}

export default ForgotPasswordConfirmation