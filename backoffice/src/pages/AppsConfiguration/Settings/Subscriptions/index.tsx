import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Subscriptions from './Subscriptions';


function SubscriptionSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des abonnements</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Abonnements"
          subHeading="Modifier la liste des abonnements"
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
            <Subscriptions/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default SubscriptionSettings;
