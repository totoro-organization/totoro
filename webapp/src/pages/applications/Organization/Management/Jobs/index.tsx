import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Grid, IconButton, Tab, Tooltip, Card, Typography, CardContent } from '@mui/material';
import PageTitle from 'src/components/PageTitle';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import StatusLabel from 'src/components/StatusLabel';
import { useApi } from 'src/hooks/useApi';
import Text from 'src/components/Text';
import TabsWrapper from 'src/components/TabsWrapper';
import { Container } from '@mui/system';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { ChangeEvent, useState } from 'react';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
import Footer from 'src/components/Footer';
import ParticipantsTable from './List/ParticipantsTable';
import { config } from 'src/services/config';
import JobItem from './subComponents/JobItem';

function Job() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: job, loading: jobLoading } = useApi(`/jobs/${id}`);
  const { data: participants, loading: participantsLoading } = useApi(`/jobs/${id}/participants`); 
  const [currentTab, setCurrentTab] = useState<string>('details');
  const tabs = [
    { value: 'details', label: 'Détails' },
    { value: 'participants', label: 'Participants' }
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  const handleGoBack = () => navigate('/organization/management/jobs');
  
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
                  <Card>
                    <img style={{ objectFit: "cover", width: '100%', maxHeight: '40vh' }} src={config.server + job.attachments[0].image} alt="Job Image" />
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="subtitle2">
                        <Grid justifyItems={'center'} container spacing={0}>
                          <JobItem title='Titre :'>
                            <Text color="black">
                              <b>{job.title}</b>
                            </Text>
                          </JobItem>
                          <JobItem title='Association :'>
                            <Text color="black">
                              <b>{job.author.organization.name}</b>
                            </Text>
                          </JobItem>
                          <JobItem title='Description :'>
                            <Text color="black">
                              <b>{job.description}</b>                       
                            </Text>
                          </JobItem>
                          <JobItem title='Auteur :'>
                            <Text color="black">
                              <b>
                                {job.author.user.firstname} {job.author.user.lastname} (
                                {job.author.user.username})
                              </b>
                            </Text>
                          </JobItem>
                          <JobItem title='Nombre de participants :'>
                            <Text color="black">
                              <b>
                                {job.participants_max - job.remaining_place} /{' '}
                                {job.participants_max}
                              </b>
                            </Text>
                          </JobItem>
                          <JobItem title='Adresse :'>
                          <Text color="black">
                              <b>
                                {job.address}, {job.cp} {job.commune}
                              </b>
                            </Text>
                          </JobItem>
                          <JobItem title='Difficulté :'>
                            <Text color="black">
                              <b>
                                {job.difficulty.level} ({job.difficulty.token})
                              </b>
                            </Text>
                          </JobItem>
                          <JobItem title='Dates :'>
                            <Text color="black">
                              <b>Commence le : {getFormatLocalDate(job.start_date)}</b>
                              &emsp;
                              <b>Termine le : {getFormatLocalDate(job.end_date)}</b>
                            </Text>                     
                          </JobItem>
                          <JobItem title='Créée le :'>
                            <Text color="black">{getFormatLocalDate(job.createdAt)}</Text>
                          </JobItem>
                          <JobItem title='Modifiée le :'>
                            <Text color="black">{getFormatLocalDate(job.updatedAt)}</Text>                
                          </JobItem>
                          <JobItem title='QR code :'>
                            <img src={config.server + job.qrcode} alt="Qr Code" />
                          </JobItem>
                        </Grid>
                      </Typography>
                    </CardContent>
                  </Card>
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
  )
}

export default Job