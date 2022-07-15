import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Roles from './Roles';


function RolesSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des tags</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Roles"
          subHeading="Modifier la liste des roles"
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
            <Roles/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default RolesSettings;
