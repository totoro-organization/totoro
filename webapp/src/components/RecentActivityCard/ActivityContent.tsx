import { Box, Typography } from '@mui/material';
import FallbackAvatar from 'src/components/FallbackAvatar';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface ActivityProps {
  data: any;
}

function ACtivityContent({ data }: ActivityProps) {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <FallbackAvatar
          variant="rounded"
          src=""
          fallback={data[0].name}
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
            {data[0].name}
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
        <Typography>{data[0].date}</Typography>
        <Typography>{data[0].time}</Typography>
      </Box>
    </Box>
  );
}

export default ACtivityContent;
