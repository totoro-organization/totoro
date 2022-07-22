import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import WorkIcon from '@mui/icons-material/Work';

interface ActivityProps {
  data: any;
}

function JobActivityContent({ data }: ActivityProps) {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Box
          mr={1}
          ml={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <Typography gutterBottom variant="h4">
            {data[0].job_title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FallbackAvatar
              sx={{ height: '30px' }}
              variant="rounded"
              src=""
              fallback="Tous ensemble"
              fallbackIcon={<WorkIcon />}
              alt={data[0].name}
            ></FallbackAvatar>
            <Typography ml={1}>{data[0].name}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <Typography>{data[0].date}</Typography>
        <Typography>{data[0].time}</Typography>
      </Box>
    </Box>
  );
}

export default JobActivityContent;
