// @ts-nocheck
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import UserCard from './UserCard';
import { subDays } from 'date-fns';
import { User } from 'src/models/user';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';

function UserDetails() {

  const { id } = useParams();

  const { data: user, userLoading } = useApi(`/users/${id}`);
  const { data: jobs, jobsLoading } = useApi(`/users/${id}/jobs`);

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/utilisateurs');

  return (
    <>
      <Helmet>
        <title>Utilisateur {`${user?.firstname } ${user?.lastname}`}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner à la page utilisateurs"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <PageTitle heading={`${user?.firstname } ${user?.lastname}`} subHeading={'@' + user?.username} />
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
            { userLoading ? <SuspenseLoader/> : <UserCard user={user} /> }
            {/* { jobsLoading ? <SuspenseLoader/> : (
              <TableWrapper>
                <Jobs
              </TableWrapper>
            )} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserDetails;
