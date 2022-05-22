// @ts-nocheck
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import LitigationForm from './LitigationForm';
import { subDays } from 'date-fns';
import { Litigation } from 'src/models/litigation';

function LitigationDetails() {
  // let { id } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => navigate('/gestion/litiges');

  const litigation: Litigation = {
    id: '1',
    litigation_object: {id: '1', label: 'Language offensant', description: 'Messages à caractère grossier ou injuriant'},
    job: {
      id: '1',
      title: 'Ma super mission',
      organization: 'Mon association',
      status: {id: '1', label: 'completed'},
      participants: 15,
      address: '3 rue de la paix',
      capacity: 20,
      tokens: 150,
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
      date: subDays(new Date(), 1).getTime(),
      tags: [{id:'1', label: 'humanitaire'}]
    },
    author: {
      id: '1',
      firstname: 'Téo',
      lastname: 'Lugat',
      username: 'tlugat',
      email: 'teo.lugat@hetic.net',
      jobs: [{
        id: '1',
        title: 'Ma super mission',
        organization: 'Mon association',
        status: {id: '1', label: 'completed'},
        participants: 15,
        address: '3 rue de la paix',
        capacity: 20,
        tokens: 150,
        description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
        date: subDays(new Date(), 1).getTime(),
        tags: [{id:'1', label: 'humanitaire'}]
      }],
      tokens: 150,
      status: {id: '1', label: 'active'}
    },
    target: {
      id: '1',
      firstname: 'Jarce',
      lastname: 'Boukoro',
      username: 'jarceleboss',
      email: 'jarce.boukoro@hetic.net',
      jobs: [{
        id: '1',
        title: 'Ma super mission',
        organization: 'Mon association',
        status: {id: '1', label: 'completed'},
        participants: 15,
        address: '3 rue de la paix',
        capacity: 20,
        tokens: 150,
        description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
        date: subDays(new Date(), 1).getTime(),
        tags: [{id:'1', label: 'humanitaire'}]
      }],
      tokens: 350,
      status: {id: '1', label: 'active'}
    },
    date: subDays(new Date(), 1).getTime(),
    status: {id: '2', label: 'open'},
    message: "Mon message"
};

  return (
    <>
      <Helmet>
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
          <PageTitle heading={litigation.litigation_object.label} subHeading={litigation.litigation_object.description} />
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
            <LitigationForm litigation={litigation} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default LitigationDetails;
