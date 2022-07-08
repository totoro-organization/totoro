import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import Footer from 'src/components/Footer';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import StatusLabel from 'src/components/StatusLabel';
import ParticipantCard from './subComponents/ParticipantCard';

function UserDetails() {
  const { id } = useParams();

  const { data: user, loading: userLoading } = useApi(`/users/${id}`);

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/association/gestion/missions');

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
