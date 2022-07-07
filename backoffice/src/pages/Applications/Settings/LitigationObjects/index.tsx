import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import LitigationObjects from './LitigationObjects';


function LitigationsObjectSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des objets de litige</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Objets de litige"
          subHeading="Modifier la liste des objets de litige"
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
            <LitigationObjects/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default LitigationsObjectSettings;
