import useOrganizationActivity from 'src/hooks/useOrganizationActivity';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import LastJobs from './LastJobs';
import LastMembers from './LastMembers';

function Resume() {
  const { lastJobs, lastMembers } = useOrganizationActivity({
    size: { members_size: 1, jobs_size: 3 }
  });

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <LastJobs jobs={lastJobs}/>
          </Grid>
          <Grid item xs={12}>
            <LastMembers members={lastMembers} />
          </Grid>
          {/* <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Resume;
