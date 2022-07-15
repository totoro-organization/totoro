<<<<<<< HEAD
import CreatingCard from './CreatingCard';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

export default function ListingMissions() {


  return (
    <>
      <Container maxWidth="md">
        <PageTitleWrapper>
        <Typography variant="h2" component="h1" gutterBottom>
          Création de votre mission
        </Typography>
        <Typography variant="subtitle2">
          Remplissez ce formulaire pour ajouter votre mission.
        </Typography>
        </PageTitleWrapper>
        <Grid
          container
          justifyContent="center"
          spacing={4}
        >
          <CreatingCard />
        </Grid>
      </Container>
=======
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
        <title>Créer une mission</title>
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
>>>>>>> webapp
    </>
  );
}
