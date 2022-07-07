import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Jobs from './Jobs';


function JobList() {
  return (
    <>
      <Helmet>
        <title>Listes des Missions</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Missions"
          subHeading="Liste des missions passées, en cours ou à venir."
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
            <Jobs/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default JobList;
