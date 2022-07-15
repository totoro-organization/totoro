import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Litigations from './Litigations';


function ManagementLitigations() {
  return (
    <>
      <Helmet>
        <title>Gestion des Litiges</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Litiges"
          subHeading="Liste des litiges."
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
            <Litigations/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementLitigations;
