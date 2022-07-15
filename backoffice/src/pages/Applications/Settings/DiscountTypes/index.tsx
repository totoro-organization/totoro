import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import DiscountTypes from './DiscountTypes';


function DiscountTypesSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des discountTypes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="DiscountTypes"
          subHeading="Modifier la liste des discountTypes"
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
            <DiscountTypes/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DiscountTypesSettings;
