import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid, styled } from '@mui/material';
import Footer from 'src/components/Footer';
import TabsWrapper from 'src/components/TabsWrapper';

function ManagementUserSettings() {

  const [currentTab, setCurrentTab] = useState<string>('free');

  const tabs = [
    { value: 'free', label: 'Abonnements gratuits' },
    { value: 'premium', label: 'Abonnements premium' },
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
            {/* {currentTab === 'free' && <FreeTab />}
            {currentTab === 'premium' && <PremiumTab />}
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
