import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import DashboardJobCard from 'src/components/DashboardJobCard';
import { Job } from 'src/models';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10
});

const JobsWrapper = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap'
});

interface LastJobsProps {
  jobs: Job[];
}

function LastJobs({ jobs }: LastJobsProps) {
  return (
    <Container>
      <Typography variant="h3">Missions récentes</Typography>
      <JobsWrapper>
        {jobs.length
          ? jobs.map((job) => <DashboardJobCard key={job.id} job={job} />)
          : 'Aucune mission'}
      </JobsWrapper>
    </Container>
  );
}

export default LastJobs;
