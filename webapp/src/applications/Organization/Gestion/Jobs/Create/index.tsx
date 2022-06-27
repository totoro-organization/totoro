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
    </>
  );
}
