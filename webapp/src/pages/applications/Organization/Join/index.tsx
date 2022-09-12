import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
} from '@mui/material';

import Footer from 'src/components/Footer';
import JoinOrganizationForm from 'src/components/JoinOrganizationForm';


function JoinOrganization() {
  return (
    <>
      <Helmet>
        <title>Rejoindre une association</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Rejoindre une association"
          subHeading="Sélectionnez une ou plusieurs association(s) pour éffectuer une demande d'adhésion"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <JoinOrganizationForm/>
      </Container>
      <Footer />
    </>
  );
}

export default JoinOrganization;
