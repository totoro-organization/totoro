import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import LitigationCard from './LitigationCard';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function LitigationDetails() {
  let { id } = useParams();

  const { data: litigation, loading } = useApi(`/litigations/${id}`);

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/litiges');


  return (
    <>
      {/* <Helmet>
        <title>{litigation.litigation_object.label}</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex">
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
          <Grid item xs={12}>
            { !loading && litigation ? <LitigationCard litigation={litigation} /> : <SuspenseLoader/>}
          </Grid>
        </Grid>
      </Container> */}
      <Footer />
    </>
  );
}

export default LitigationDetails;
