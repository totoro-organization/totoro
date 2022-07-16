import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { styled } from '@mui/material/styles';

function OrganizationActivityContent() {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <FallbackAvatar
          variant="rounded"
          src=""
          fallback="Voir ensemble"
          fallbackIcon={<VolunteerActivismIcon />}
          alt="Organization name"
        ></FallbackAvatar>
        <Box
          ml={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <Typography gutterBottom variant="h4">
            Voir ensemble
          </Typography>
          <Typography mr={1} variant="subtitle2">
            16 membres
          </Typography>
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

export default OrganizationActivityContent;
