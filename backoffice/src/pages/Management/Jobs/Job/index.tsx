import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import JobCard from './JobCard';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import ImageGallery from './ImageGallery';
import ParticipantsTable from './ParticipantsTable';
import TableWrapper from 'src/components/TableWrapper';

function JobDetails() {

  const { id } = useParams();

  const { data: job, loading: jobLoading } = useApi(`/jobs/${id}`);
  const { data: participants, loading: participantsLoading } = useApi(`/jobs/${id}/participants`);

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/missions');
  
  return (
    <>
      <Helmet>
        <title>{job?.title}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex">
          <Tooltip onClick={handleGoBack} arrow placement="top" title="Retourner aux missions">
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
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
            { !jobLoading && job ? (
              <> 
              <JobCard job={job} />
              {/* <ImageGallery images={job.attachments} /> */}
              </>
            ) : <SuspenseLoader/>}
             
             { !participantsLoading && participants ? (
              <TableWrapper title='Participants' defaultItems={participants?.data}>
                <ParticipantsTable items={participants} /> 
              </TableWrapper>
             ): <SuspenseLoader/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default JobDetails;
