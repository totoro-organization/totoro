import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Admins from './Admins';


function ManagementAdmins() {
  
  return (
    <>
      <Helmet>
        <title>Gestion des administrateurs</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Administrateurs"
          subHeading="Liste des administrateurs."
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
            <Admins/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementAdmins;
