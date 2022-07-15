import { FC, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import format from 'date-fns/format';
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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import type { Job, TableProps } from 'src/models';
import Modal from "src/components/Modal";
import { DeleteJobContent } from './JobModalContent';
import StatusSelect from 'src/components/StatusSelect';
import { useModal } from 'src/hooks/useModal';


const JobsTable: FC<TableProps<Job>> = ({
  items: jobs, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  statusOptions,
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
              <TableCell>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell align="right">Tokens</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => {
              const isJobSelected = selectedItems.includes(
                job.id
              );
              return (
                <TableRow
                  hover
                  key={job.id}
                  selected={isJobSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isJobSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, job.id)
                      }
                      value={isJobSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    ><Link to={`/gestion/missions/${job.id}`}>{job.title}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {job.author.organization ? job.author.organization.name : `${job.author.user.firstname} ${job.author.user.lastname} (${job.author.user.username})`}
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
                      {format(new Date(job.createdAt), "dd/MM/yyyy HH:mm:ss")}
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
                      {job.participants_max - job.remaining_place} / { job.participants_max }
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
                      {job.difficulty.token}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                  <StatusSelect table={table} currentItem={{ id: job.id, status: job.status}} statusOptions={statusOptions} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(job)}
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
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer la mission suivante : ${deleteModalItem?.title}`}>
            <DeleteJobContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default JobsTable;
