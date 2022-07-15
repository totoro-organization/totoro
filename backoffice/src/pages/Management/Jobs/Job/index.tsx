import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tab, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import JobCard from './JobCard';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import ImageGallery from './ImageGallery';
import ParticipantsTable from './ParticipantsTable';
import TableWrapper from 'src/components/TableWrapper';
import { ChangeEvent, useState } from 'react';
import TabsWrapper from 'src/components/TabsWrapper';
import StatusLabel from 'src/components/StatusLabel';

function JobDetails() {
  const { id } = useParams();

  const { data: job, loading: jobLoading } = useApi(`/jobs/${id}`);
  const { data: participants, loading: participantsLoading } = useApi(
    `/jobs/${id}/participants`
  );

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>('details');

  const tabs = [
    { value: 'details', label: 'Détails' },
    { value: 'participants', label: 'Participants' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleGoBack = () => navigate('/gestion/missions');

  return (
    <>
      <Helmet>
        <title>{job?.title}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box alignItems={"center"} display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner aux missions"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <PageTitle
            heading={job?.title}
            subHeading={job?.author.organization.name}
          />
          { job && <StatusLabel status={job?.status.label}/>}
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
          <TabsWrapper
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabsWrapper>
          <Grid item xs={12}>
            {currentTab === 'details' &&
              (!jobLoading && job ? (
                <>
                  <JobCard job={job} />
                  {/* <ImageGallery images={job.attachments} /> */}
                </>
              ) : (
                <SuspenseLoader />
              ))}
            {currentTab === 'participants' &&
              (!participantsLoading && participants ? (
                <TableWrapper
                  title="Participants"
                  defaultItems={participants?.data}
                >
                  <ParticipantsTable items={participants} />
                </TableWrapper>
              ) : (
                <SuspenseLoader />
              ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default JobDetails;
