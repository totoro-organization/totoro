import { Box, CircularProgress } from '@mui/material';

function Loader({ size }) {

  return (
    <Box
      sx={{ width: size, height: size }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={size} disableShrink thickness={3} />
    </Box>
  );
}

export default Loader;
