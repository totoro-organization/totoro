import { FC } from 'react';
import {
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  TableProps,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
import { useNavigate } from 'react-router';

const ParticipantsTable: FC<TableProps<any>> = ({
  items: users, 
}) => {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="left">Prénom</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
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
                        onClick={() => navigate(`/association/gestion/participant/${user.participant.id}`)}
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ParticipantsTable;
