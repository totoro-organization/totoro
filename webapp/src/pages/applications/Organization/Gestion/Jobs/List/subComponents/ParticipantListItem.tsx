import React from 'react';
import { useNavigate, useParams } from 'react-router';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  Tooltip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';

function ParticipantListItem({ user }: any) {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <TableRow hover key={user.participant.id}>
    <TableCell>
      <Typography
        variant="body1"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
        noWrap
      >
        {user.participant.lastname}
      </Typography>
    </TableCell>
    <TableCell>
    <Typography
        variant="body1"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
        noWrap
      >
        {user.participant.firstname}
      </Typography>
    </TableCell>
    <TableCell>
    <Typography
        variant="body1"
        fontWeight="bold"
        color="text.primary"
        gutterBottom
        noWrap
      >
        {getFormatLocalDate(user.createdAt)}
      </Typography>
    </TableCell>
    <TableCell align="right">
      <Tooltip title="Voir le profil" arrow>
        <IconButton
          onClick={() => navigate(`/association/gestion/missions/${id}/participant/${user.participant.id}`)}
          sx={{
            '&:hover': { background: theme.colors.error.lighter },
            color: theme.palette.error.main
          }}
          color="inherit"
          size="small"
        >
          <AccountBoxIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
  );
}

export default ParticipantListItem

