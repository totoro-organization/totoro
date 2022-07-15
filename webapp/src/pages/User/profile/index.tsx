import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivityCard from 'src/components/RecentActivityCard';
import { useSession } from 'src/hooks/useSession';

function ManagementUserDetails() {
  const { user } = useSession();

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={7}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={5}>
            <RecentActivityCard />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserDetails;
