import { Helmet } from 'react-helmet-async';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';


function AddOrganization() {
  return (
    <>
      <Helmet>
        <title>Ajouter une association</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Ajouter une association"
          subHeading="Remplir le formulaire pour effectuer une demande d'ajout d'association"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        
      </Container>
      <Footer />
    </>
  );
}

export default AddOrganization;
