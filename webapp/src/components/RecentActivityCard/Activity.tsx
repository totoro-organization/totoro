import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import FallbackAvatar from 'src/components/FallbackAvatar';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Activities, ACTIVITY_MSG } from './activities';
import OrganizationActivityContent from './OrganizationActivityContent';

function getActivityContent(type: Activities) {
  switch (type) {
    case Activities.add_organization ||
      Activities.join_organization ||
      Activities.join_organization:
      return <OrganizationActivityContent />;
      break;
    // case Activities.add_organization:
    //   return <OrganizationActivityContent />;
    //   break;

    default:
      break;
  }
}

interface ActivityProps {
  type: Activities;
}

function Activity({ type }: ActivityProps) {
  const theme = useTheme();
  return (
    <Box px={2} py={4}>
      {/* <Box pl={2} flex={1}> */}
      <Typography mb={2} variant="h2">
        {ACTIVITY_MSG[type]}
      </Typography>
      {/* <Box display="flex">
          <FallbackAvatar
            sx={{ width: '5rem', height: '5rem' }}
            variant="rounded"
            src={tour.logo}
            fallback={tour.name}
            fallbackIcon={<VolunteerActivismIcon />}
            alt="Association name"
          ></FallbackAvatar>
          <Box
            ml={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
            >
              {tour.name}
            </Typography>
            <Typography
              mr={1}
              variant="subtitle2"
              sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
            >
              {tour.price} membres
            </Typography>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
}

export default Activity;
