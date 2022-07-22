import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Activities, ACTIVITY_MSG, ACTIVITY_DATA } from './activities';
import JobActivityContent from './JobActivityContent';
import ACtivityContent from './ActivityContent';

interface ActivityProps {
  type: Activities;
}

function Activity({ type }: ActivityProps) {
  return (
    <Box px={2} py={4}>
      <Typography mb={2} variant="h2">
        {ACTIVITY_MSG[type]}
      </Typography>
      {type === 'add_job' ? (
        <JobActivityContent data={ACTIVITY_DATA} />
      ) : (
        <ACtivityContent data={ACTIVITY_DATA} />
      )}
    </Box>
  );
}

export default Activity;
