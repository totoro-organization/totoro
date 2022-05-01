import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';

function ManagementJobs() {
  return (
    <>
      <Helmet>
        <title>Gestion des Missions</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Missions"
          subHeading="Liste des missions passées, en cours ou à venir."
        />
      </PageTitleWrapper>
      
        <h1>test</h1>
      
      <Footer />
    </>
  );
}

export default ManagementJobs;
