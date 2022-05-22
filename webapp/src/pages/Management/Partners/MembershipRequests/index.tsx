import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import MembershipRequests from '../MembershipRequests/MembershipRequests';


function ManagementMembershipRequests() {
  return (
    <>
      <Helmet>
        <title>Demandes de partenariat</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Demandes de partenariat"
          subHeading="Liste des demandes de partenariat."
        />
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
            <MembershipRequests/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementMembershipRequests;
