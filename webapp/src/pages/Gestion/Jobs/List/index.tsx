import PageHeader from './PageHeader';
import CreatingCard from './CreatingCard';
import PageTitleWrapper from 'src/components/PageTitleWrapper';import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

export default function ListingMissions() {


  return (
    <>
      <Container maxWidth="lg">
      <PageTitleWrapper>
          <PageHeader />
      </PageTitleWrapper>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <CreatingCard />
        </Grid>
      </Container>
    </>
  );
}
