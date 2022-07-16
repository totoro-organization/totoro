import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/material/styles';

function JobActivityContent() {
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
            Sauvegarder le patrimoine : RÉNOVER UN MONUMENT
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FallbackAvatar
              sx={{ height: '30px' }}
              variant="rounded"
              src=""
              fallback="Tous ensemble"
              fallbackIcon={<WorkIcon />}
              alt="Organization name"
            ></FallbackAvatar>
            <Typography ml={1}>Tous ensemble</Typography>
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
        <Typography>14/03</Typography>
        <Typography>10:10</Typography>
      </Box>
    </Box>
  );
}

export default JobActivityContent;
