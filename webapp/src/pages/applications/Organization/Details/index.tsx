import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Container, IconButton, Tooltip } from '@mui/material';

import Footer from 'src/components/Footer';
import OrganizationCard from 'src/components/OrganizationCard';
import { useParams } from 'react-router';
import { useOrganization } from 'src/api/organizations/hooks';
import SuspenseLoader from 'src/components/SuspenseLoader';
import GoBackButton from 'src/components/GoBackButton';
import { APP_PATHS } from 'src/appPaths';

function OrganizationDetails() {
  const { id } = useParams();
  const { data: organization, loading } = useOrganization(id);
  return organization && !loading ? (
    <>
      <Helmet>
        <title>{organization?.name}</title>
      </Helmet>
      <PageTitleWrapper>
        <GoBackButton
          path={APP_PATHS.JOIN_ORGANIZATION}
          tooltipText="Retourner aux associations"
        >
          <PageTitle
            heading={organization?.name}
            subHeading={organization?.activity}
          />
        </GoBackButton>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <OrganizationCard organization={organization} />
      </Container>
      <Footer />
    </>
  ) : (
    <SuspenseLoader />
  );
}

export default OrganizationDetails;
