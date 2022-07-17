import { Container } from '@mui/material';
import { useState } from 'react';
import AfterResetPasswordConfirmation from './AfterValidationContent';
import BeforeResetValidationContent from './BeforeValidationContent';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 4,
  height: '100%'
};

function ResetPassword() {

  const [isValidate, setIsValidate] = useState(false)

  return (
    <Container sx={containerStyles} component="main" maxWidth="sm">
      {
        isValidate ? <AfterResetPasswordConfirmation/> : <BeforeResetValidationContent setIsValidate={setIsValidate}/>
      }
    </Container>
  );
}

export default ResetPassword;
