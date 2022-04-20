import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Partners from './Partners';


function ManagementPartners() {
  return (
    <>
      <Helmet>
        <title>Gestion des Partenaires</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Partenaires"
          subHeading="Liste des entreprises partenaires."
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
            {/* <Partners/> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementPartners;
