import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import DashboardMemberCard from 'src/components/DashboardMemberCard';
import { OrganizationMember } from 'src/models';

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
  members: OrganizationMember[];
}

function LastJobs({ members }: LastJobsProps) {
  return (
    <Container>
      <Typography variant="h3">Membres récents</Typography>
      <JobsWrapper>
        {members.length
          ? members.map((member) => <DashboardMemberCard key={member.id} member={member} />)
          : 'Aucune adhésion'}
      </JobsWrapper>
    </Container>
  );
}

export default LastJobs;
