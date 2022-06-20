import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tab, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import OrganizationCard from './OrganizationCard';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import ImageGallery from './ImageGallery';
import ParticipantsTable from './ParticipantsTable';
import TableWrapper from 'src/components/TableWrapper';
import { ChangeEvent, useState } from 'react';
import TabsWrapper from 'src/components/TabsWrapper';
import StatusLabel from 'src/components/StatusLabel';

function OrganizationDetails() {
  const { id } = useParams();

  const { data: organization, loading: organizationLoading } = useApi(`/organizations/${id}`);
  // const { data: participants, loading: participantsLoading } = useApi(
  //   `/organizations/${id}/participants`
  // );

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>('details');

  const tabs = [
    { value: 'details', label: 'Détails' },
    { value: 'members', label: 'Membres' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleGoBack = () => navigate('/gestion/associations');

  return (
    <>
      <Helmet>
        <title>{organization?.name}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box alignItems={"center"} display="flex">
          <Tooltip
            onClick={handleGoBack}
            arrow
            placement="top"
            title="Retourner aux associations"
          >
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <PageTitle
            heading={organization?.name}
            subHeading={organization?.activity}
          />
          { organization && <StatusLabel status={organization?.status.label}/>}
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
              (!organizationLoading && organization ? (
                <>
                  <OrganizationCard organization={organization} />
                  {/* <ImageGallery images={organization.attachments} /> */}
                </>
              ) : (
                <SuspenseLoader />
              ))}
            {/* {currentTab === 'participants' &&
              (!participantsLoading && participants ? (
                <TableWrapper
                  title="Participants"
                  defaultItems={participants?.data}
                >
                  <ParticipantsTable items={participants} />
                </TableWrapper>
              ) : (
                <SuspenseLoader />
              ))} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OrganizationDetails;
