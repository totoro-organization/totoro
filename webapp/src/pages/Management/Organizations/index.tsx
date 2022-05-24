import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Organizations from './Organizations';


function ManagementOrganizations() {
  return (
    <>
      <Helmet>
        <title>Gestion des associations</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Associations"
          subHeading="Liste des associations."
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
            <Organizations/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementOrganizations;
