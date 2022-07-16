import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Activities, ACTIVITY_MSG } from './activities';
import JobActivityContent from './JobActivityContent';
import OrganizationActivityContent from './OrganizationActivityContent';
import DiscountActivityContent from './DiscountActivityContent';
import PartnerACtivityContent from './PartnerACtivityContent';

interface ActivityProps {
  type: Activities;
}

function getActivityContent(type) {
  switch (type) {
    case Activities.add_organization ||
      Activities.join_organization ||
      Activities.request_organization ||
      Activities.invite_organization_member:
      return <OrganizationActivityContent />;

    case Activities.add_job:
      return <JobActivityContent />;

    case Activities.add_discount:
      return <DiscountActivityContent />;

    case Activities.add_partner:
      return <PartnerACtivityContent />;

    default:
      break;
  }
}

function Activity({ type }: ActivityProps) {
  return (
    <Box px={2} py={4}>
      <Typography mb={2} variant="h2">
        {ACTIVITY_MSG[type]}
      </Typography>
      {getActivityContent(type)}
    </Box>
  );
}

export default Activity;
