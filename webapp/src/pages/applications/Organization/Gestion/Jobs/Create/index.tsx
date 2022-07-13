import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import JobForm from 'src/components/JobForm';
import Footer from 'src/components/Footer';
import PageTitle from 'src/components/PageTitle';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@mui/material';

export default function ListingMissions() {
  return (
    <>
      <Helmet>
        <title>Listes des Missions</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Créer une mission"
          subHeading="Remplissez ce formulaire pour ajouter votre mission."
        />
      </PageTitleWrapper>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <JobForm />
              </CardContent>
            </Card>
            
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
