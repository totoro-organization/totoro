import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function DiscountActivityContent() {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <FallbackAvatar
          variant="rounded"
          src=""
          fallback="La Fnac"
          fallbackIcon={<LocalOfferIcon />}
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
          <Typography mr={1} variant="subtitle2">
            10 tokens
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
        <Typography>12/03</Typography>
        <Typography>12:10</Typography>
      </Box>
    </Box>
  );
}

export default DiscountActivityContent;
