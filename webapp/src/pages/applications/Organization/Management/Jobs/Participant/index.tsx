import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import Footer from 'src/components/Footer';
import SuspenseLoader from 'src/components/SuspenseLoader';
import StatusLabel from 'src/components/StatusLabel';
import ParticipantCard from './subComponents/ParticipantCard';
import { useUser } from 'src/api/users/hooks';

function UserDetails() {
  const { jobId ,id } = useParams();

  const { data: { data: user }, loading: userLoading } = useUser(id);

  const navigate = useNavigate();

  const handleGoBack = () => navigate(`/organization/management/jobs/${jobId}`);

  return (
    <>
      <Helmet>
        <title>Participant {`${user?.firstname} ${user?.lastname}`}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box alignItems={'center'} display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner à la page des missions"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <PageTitle
            heading={`${user?.firstname} ${user?.lastname}`}
            subHeading={'@' + user?.username}
          />
          {user && <StatusLabel status={user?.status.label} />}
        </Box>
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
            {userLoading ? <SuspenseLoader /> : <ParticipantCard user={user} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserDetails;
