// @ts-nocheck
import { ChangeEvent, useState } from 'react';
import {
  Tooltip,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Link } from 'react-router-dom';
import StatusLabel from 'src/components/StatusLabel';

export default function AdminsTable({
  items: admins, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems
}) {

  const theme = useTheme();

  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={selectedAllItems}
              indeterminate={selectedSomeItems}
              onChange={handleSelectAllItems}
            />
          </TableCell>
          <TableCell>Details</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="right">Role</TableCell>
          <TableCell align="right">Statut</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {admins.map((admin) => {
          const isAdminSelected = selectedItems.includes(admin.id);
          return (
            <TableRow hover key={admin.id} selected={isAdminSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isAdminSelected}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleSelectOneItem(event, admin.id)
                  }
                  value={isAdminSelected}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  <Link
                    to={`/gestion/administrateurs/${admin.id}`}
                  >{`${admin.firstname} ${admin.lastname}`}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {'@' + admin.username}
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
                  {admin.email}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {admin.role.label}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <StatusLabel status={admin.status.label} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Editer la mission" arrow>
                  <IconButton
                    sx={{
                      '&:hover': {
                        background: theme.colors.primary.lighter
                      },
                      color: theme.palette.primary.main
                    }}
                    color="inherit"
                    size="small"
                  >
                    <EditTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer la mission" arrow>
                  <IconButton
                    sx={{
                      '&:hover': { background: theme.colors.error.lighter },
                      color: theme.palette.error.main
                    }}
                    color="inherit"
                    size="small"
                  >
                    <DeleteTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}