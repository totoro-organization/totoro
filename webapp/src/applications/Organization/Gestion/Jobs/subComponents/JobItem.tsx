import { FC, ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

interface JobItemProps {
  title: String,
  children?: ReactNode
}

const JobItem: FC<JobItemProps> = ({children,title}) => {
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

export default JobItem;


