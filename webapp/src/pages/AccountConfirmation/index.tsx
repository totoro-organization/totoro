import { Box, Container, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validateAccountUser } from 'src/services/users.service';
import AfterValidationContent from './AfterValidationContent';
import BeforeValidationContent from './BeforeValidationContent';

const Content = styled(Box)(
  ({ theme }) => `
          display: flex;
          flex: 1 1;
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
  const [searchParams] = useSearchParams();
  const [isValidate, setIsValidate] = useState(false);

  const token = searchParams.get('access_token');

  useEffect(() => {
    (async () => {
      if(token) {
        const response = await validateAccountUser(decodeURIComponent(token));
        if('error' in response) return
        setIsValidate(prevState => !prevState);
      }
    })()
  }, [token])
  return (
    <Container sx={{ height: '100%' }} component="main" maxWidth="md">
      <Content>
       {
        isValidate ? <AfterValidationContent/> : <BeforeValidationContent/>
       }
      </Content>
    </Container>
  );
}

export default AccountConfirmation;
