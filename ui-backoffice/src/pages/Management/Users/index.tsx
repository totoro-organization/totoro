import { Helmet } from 'react-helmet-async';
import { useApi, ApiResponse } from '../../../hooks/useApi';
import { getUsers} from '../../../services/users';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';

import Footer from 'src/components/Footer';
import Users from './Users';
import { useEffect } from 'react';


function ManagementUsers() {

  const { data } = useApi(getUsers());
  
  return (
    <>
      <Helmet>
        <title>Gestion des utilisateurs</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Utilisateurs"
          subHeading="Liste des utilisateurs."
        />
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
            <Users/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUsers;
