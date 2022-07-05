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
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

const MembersTable: FC<TableProps<any>> = ({
  items: members, 
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
              <TableCell align="left">Rôle</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow hover key={member.user.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {member.user.lastname}
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
                      {member.user.firstname}
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
                      {format(new Date(member.createdAt), "dd/MM/yyyy HH:mm:ss")}
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
                      {member.role.label}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Voir le profil" arrow>
                      <IconButton
                        onClick={() => navigate(`/gestion/utilisateurs/${member.user.id}`)}
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

export default MembersTable;
