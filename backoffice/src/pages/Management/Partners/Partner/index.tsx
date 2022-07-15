import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tab, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import PartnerCard from './PartnerCard';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import TableWrapper from 'src/components/TableWrapper';
import { ChangeEvent, useState } from 'react';
import TabsWrapper from 'src/components/TabsWrapper';
import StatusLabel from 'src/components/StatusLabel';
import DiscountsTable from './DiscountsTable';

function PartnerDetails() {
  const { id } = useParams();

  const { data: partner, loading: partnerLoading } = useApi(`/partners/${id}`);
  const { data: discounts, loading: discountsLoading } = useApi(
    `/partners/${id}/discounts`
  );

  console.log(discounts);
  
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>('details');

  const tabs = [
    { value: 'details', label: 'Détails' },
    { value: 'discounts', label: 'Coupons' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const handleGoBack = () => navigate('/gestion/partenaires');

  return (
    <>
      <Helmet>
        <title>{partner?.title}</title>
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
            heading={partner?.name}
            subHeading={partner?.adress}
          />
          { partner && <StatusLabel status={partner?.status.label}/>}
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
              (!partnerLoading && partner ? (
                <>
                  <PartnerCard partner={partner} />
                  {/* <ImageGallery images={partner.attachments} /> */}
                </>
              ) : (
                <SuspenseLoader />
              ))}
            {currentTab === 'discounts' &&
              (!discountsLoading && discounts ? (
                <TableWrapper
                  title="Coupons de réduction"
                  defaultItems={discounts?.data}
                >
                  <DiscountsTable items={discounts} />
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

export default PartnerDetails;
