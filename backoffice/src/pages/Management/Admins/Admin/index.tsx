// @ts-nocheck
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import AdminCard from './AdminCard';
import { subDays } from 'date-fns';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import AdminLogsTable from './AdminLogsTable';

function AdminDetails() {

  const { id } = useParams();

  const { data: admin, loadingAdmin } = useApi(`/admins/${id}`);
  const { data: logs, loadingLogs } = useApi(`/admins/${id}/logs`);

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/administrateurs');

  return (
    <>
      <Helmet>
        <title>Administrateur {`${admin?.firstname } ${admin?.lastname}`}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner à la page administrateur"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          {/* <PageTitle heading={`${admin?.firstname } ${admin?.lastname} (@${admin?.username})`}/> */}
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
            <AdminCard admin={admin} /> 
          </Grid>
          <Grid item xs={12}>
            {logs ? <AdminLogsTable logs={logs?.data} /> : <SuspenseLoader />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default AdminDetails;
