import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import StorefrontIcon from '@mui/icons-material/Storefront';

function PartnerACtivityContent() {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <FallbackAvatar
          variant="rounded"
          src=""
          fallback="La Fnac"
          fallbackIcon={<StorefrontIcon />}
          alt="Partner name"
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
            La Fnac
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
        <Typography>15/03</Typography>
        <Typography>16:20</Typography>
      </Box>
    </Box>
  );
}

export default PartnerACtivityContent;
