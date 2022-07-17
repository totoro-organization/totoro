import { styled, Typography } from '@mui/material';
import ResetPasswordForm from 'src/components/ResetPasswordForm';

const Heading = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 8
});

interface BeforeResetValidationContentProps {
  setIsValidate: (bool: boolean) => void
}

function BeforeResetValidationContent({ setIsValidate }: BeforeResetValidationContentProps) {
  return (
    <>
      <Heading>
        <Typography component="h1" variant="h2">
          Choisis un nouveau mot de passe
        </Typography>
        <Typography component="h5" variant="subtitle1">
          Ce mot de passe te permet de te connecter aux applications Totoro.
          Choisis le avec précaution !
        </Typography>
      </Heading>
      <ResetPasswordForm setIsValidate={setIsValidate} />
    </>
  );
}

export default BeforeResetValidationContent;
