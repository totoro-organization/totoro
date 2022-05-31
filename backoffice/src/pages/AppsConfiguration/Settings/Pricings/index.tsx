import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Pricings from './Pricings';


function PricingsSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des pricings</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Pricings"
          subHeading="Modifier la liste des pricings"
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
            <Pricings/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default PricingsSettings;
