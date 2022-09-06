import { useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Grid, IconButton, Tab, Tooltip } from '@mui/material';
import PageTitle from 'src/components/PageTitle';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import StatusLabel from 'src/components/StatusLabel';
import TabsWrapper from 'src/components/TabsWrapper';
import { Container } from '@mui/system';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { ChangeEvent, useState } from 'react';
import Footer from 'src/components/Footer';
import ParticipantsTable from './List/ParticipantsTable';
import { useJob, useJobParticipants } from 'src/api/jobs/hooks';
import JobCard from 'src/components/JobCard';
import GoBackButton from 'src/components/GoBackButton';
import { APP_PATHS } from 'src/appPaths';

function Job() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { data: job, loading: jobLoading } = useJob(jobId);
  const { data: participants, loading: participantsLoading } =
    useJobParticipants(jobId);
  const [currentTab, setCurrentTab] = useState<string>('details');
  const tabs = [
    { value: 'details', label: 'Détails' },
    { value: 'participants', label: 'Participants' }
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>{job?.title}</title>
      </Helmet>
      <PageTitleWrapper>
        <GoBackButton
          path={APP_PATHS.ORGANIZATION_JOBS}
          tooltipText="Retourner aux associations"
        >
          <PageTitle
            heading={job?.title}
            subHeading={job?.author.organization.name}
          />
          {job && <StatusLabel status={job?.status.label} />}
        </GoBackButton>
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
              (!jobLoading && job ? <JobCard job={job} /> : <SuspenseLoader />)}
            {currentTab === 'participants' &&
              (!participantsLoading && participants ? (
                <TableWrapper title="Participants" defaultItems={participants}>
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

export default Job;
