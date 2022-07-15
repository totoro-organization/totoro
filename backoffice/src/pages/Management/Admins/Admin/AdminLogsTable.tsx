import { FC, ChangeEvent } from 'react';
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
  TableProps,
} from '@mui/material';

import Modal from 'src/components/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { DeleteLogContent } from './LogModalContent';
import { useModal } from 'src/hooks/useModal';

const LogsTable: FC<TableProps<any>> = ({
  items: logs, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleDeleteItem,
  table
}) => {

  const theme = useTheme();

  const [deleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteModalItem] = useModal();

  const handleDelete = (id: string) => {
    handleDeleteItem(id);
    handleCloseDeleteModal();
  }

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
              <TableCell>Table</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => {
              const isLogSelected = selectedItems.includes(log.id);
              return (
                <TableRow hover key={log.id} selected={isLogSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLogSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, log.id)
                      }
                      value={isLogSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >{log.table}
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
                      {log.action}
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
                      {log.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(log)}
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
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer l'utilisateur suivant : ${deleteModalItem?.firstname} ${deleteModalItem?.lastname}`}>
            <DeleteLogContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default LogsTable;
