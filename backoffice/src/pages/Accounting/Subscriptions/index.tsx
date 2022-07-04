import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import TabsWrapper from 'src/components/TabsWrapper';
import StandardTab from './components/StandardSubscriptionsTab';
import ProTab from './components/ProSubscriptionsTab';
import ExpiredTab from './components/ExpiredSubscriptionsTab';
import CanceledTab from './components/CanceledSubscriptionsTab';

function ManagementUserSettings() {

  const [currentTab, setCurrentTab] = useState<string>('standard');
  const [tabs, setTabs] = useState([
    { value: 'standard', label: 'Abonnements Standards', length: null },
    { value: 'pro', label: 'Abonnements Pro', length: null },
    { value: 'expired', label: 'Abonnements expirés', length: null },
    { value: 'canceled', label: 'Abonnements annulés', length: null }
  ])

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleSetTabs = (name: string, value: string) => {
    let tab = tabs.find(tab => tab.value === name);
    const tabIndex = tabs.indexOf(tab);
    const newTabs = [...tabs];
    newTabs[tabIndex].length = value;
    setTabs(newTabs)
  }

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
                <Tab key={tab.value} label={tab.length !== null ? `${tab.label} (${tab.length})` : tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'standard' && <StandardTab handleSetTabs={handleSetTabs} />}
            {currentTab === 'pro' && <ProTab handleSetTabs={handleSetTabs} />}
            {currentTab === 'expired' && <ExpiredTab handleSetTabs={handleSetTabs} />}
            {currentTab === 'canceled' && <CanceledTab handleSetTabs={handleSetTabs} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserSettings;
