import { Box, IconButton, Tooltip } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

interface GoBackButtonProps {
  path: string;
  tooltipText?: string;
  children: JSX.Element | JSX.Element[];
}

function GoBackButton({ children, path, tooltipText }: GoBackButtonProps) {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(path);

  return (
    <Box alignItems={'center'} display="flex">
      <Tooltip onClick={handleGoBack} arrow placement="top" title={tooltipText}>
        <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
      </Tooltip>
      {children}
    </Box>
  );
}

export default GoBackButton;
