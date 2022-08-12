import { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

interface ParticipantItemProps {
  title: String,
  children?: ReactNode
}

function ParticipantItem({children, title}: ParticipantItemProps) {
  return (
    <>
      <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
        <Box pr={3} pb={2}>
          {title}
        </Box>
      </Grid>
      <Grid item xs={12} sm={10} md={9}>
        {children}
      </Grid>
    </>
  )
}

export default ParticipantItem;