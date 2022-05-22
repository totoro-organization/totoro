// @ts-nocheck
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import RequestForm from './RequestForm';
import { subDays } from 'date-fns';
import { MembershipRequest } from 'src/models/membership_request';

function RequestDetails() {
  // let { id } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/partenaires/demandes');

  const request: MembershipRequest = {
    id: '1',
    partner: {
      id: '1',
      name: 'Boulangerie Le fournil de Carole',
      email: 'lefournildecarole@gmail.com',
      phone: '0769086554',
      address: '54 rue croix nivert, 75015 Paris',
      discount: [],
      status: { id: '1', label: 'active' }
    },
    date: subDays(new Date(), 1).getTime(),
    status: { id: '5', label: 'open' }
  };

  return (
    <>
      <Helmet>
        <title>{request.partner.name}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner aux missions"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <PageTitle heading={request.partner.name} />
        </Box>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RequestForm request={request} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default RequestDetails;
