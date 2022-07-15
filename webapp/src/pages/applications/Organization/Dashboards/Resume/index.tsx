import { Container, Grid } from '@mui/material';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import { useSession } from 'src/hooks/useSession';
import RecentsJobsCard from './subComponents/RecentsJobsCard';
import RecentsMembersCard from './subComponents/RecentsMembersCard';


function Resume() {
  const { currentApp } = useSession();

  const { data: jobs, loading } = useApi(
    `/organizations/${currentApp.data.id}/jobs`
  );

  const { data: members } = useApi(
    `/organizations/${currentApp.data.id}/members`
  );

  if (members) {
    console.log(members);

  }

  // // if (jobs) {
  // //   const date = jobs.data.sort(function(x:any, y:any) {
  // //     var firstDate = new Date(x.createdAt),
  // //       SecondDate = new Date(y.createdAt);

  // //     if (firstDate > SecondDate) return -1;
  // //     if (firstDate < SecondDate) return 1;
  // //     return 0;
  // //   });
  // //   console.log(jobs.data); 
  // }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          {jobs && !loading ? (
            <RecentsJobsCard jobs={jobs.data} />
          ) : (
            <SuspenseLoader />
          )}
        </Grid>
        <Grid item xs={12}>
          {members && !loading ? (
            <RecentsMembersCard members={members.data} />
          ) : (
            <SuspenseLoader />
          )}
        </Grid>
      </Grid>
    </Container>

  )
}

export default Resume