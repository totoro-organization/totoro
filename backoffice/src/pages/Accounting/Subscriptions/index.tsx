import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TabsWrapper from 'src/components/TabsWrapper';
import FreeTab from './components/StandardSubscriptionsTab';

function ManagementUserSettings() {

  const [currentTab, setCurrentTab] = useState<string>('standard');

  const tabs = [
    { value: 'standard', label: 'Abonnements Standards' },
    { value: 'pro', label: 'Abonnements Pro' },
    { value: 'expired', label: 'Abonnements expirés' },
    { value: 'canceled', label: 'Abonnements annulés' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Comptabilité - Abonnements</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'standard' && <FreeTab />}
            {/* {currentTab === 'standard' && <FreeTab />}
            {currentTab === 'pro' && <PremiumTab />}
            {currentTab === 'expired' && <ExpiredTab />}
            {currentTab === 'canceled' && <CanceledTab />} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserSettings;
