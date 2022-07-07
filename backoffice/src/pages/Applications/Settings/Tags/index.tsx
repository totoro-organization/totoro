import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Tags from './Tags';


function TagsSettings() {
  
  return (
    <>
      <Helmet>
        <title>Paramétrage des tags</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Tags"
          subHeading="Modifier la liste des tags"
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
            <Tags/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default TagsSettings;
