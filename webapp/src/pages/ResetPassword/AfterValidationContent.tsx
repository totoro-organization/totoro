import { Box, Button, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


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

  const Heading = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8
  });

function AfterResetPasswordConfirmation() {
  return (
    <Content>
          <Heading>
            <Typography component="h1" variant="h2">
              Ton mot de passe a bien été modifié !
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              C'est bon, tu vas enfin pouvoir retourner à tes missions. Utilise ton nouveau mot de passe pour te connecter.
            </Typography>
          </Heading>
          <Button variant="contained" color="primary" LinkComponent={NavLink}>
            Je me connecte
          </Button>
        {/* <ConfirmationIllustration /> */}
      </Content>
  )
}

export default AfterResetPasswordConfirmation