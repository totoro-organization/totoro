import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Statuses from './Statuses';


function StatusesSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des statuts</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Statuts"
          subHeading="Modifier la liste des statuts"
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
            <Statuses/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default StatusesSettings;
