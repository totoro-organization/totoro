import { Box, Container, styled } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
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
  const token = searchParams.get('access_token');
  
  return (
    <Container sx={{ height: '100%' }} component="main" maxWidth="md">
      <Content>
       {
        token ? <AfterValidationContent/> : <BeforeValidationContent/>
       }
      </Content>
    </Container>
  );
}

export default AccountConfirmation;
