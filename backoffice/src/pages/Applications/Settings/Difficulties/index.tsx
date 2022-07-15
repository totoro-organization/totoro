import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Difficulties from './Difficulties';


function DifficultiesSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des tags</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Difficultés de mission"
          subHeading="Modifier la liste des difficultés"
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
            <Difficulties/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DifficultiesSettings;
