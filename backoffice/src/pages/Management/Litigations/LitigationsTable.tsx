import { FC, ChangeEvent } from 'react';
import { Link } from "react-router-dom";

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

import { Litigation } from 'src/models/litigation';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { TableProps } from 'src/components/TableWrapper';
import { DeleteLitigationContent } from './LitigationModalContent';
import Modal from 'src/components/Modal';
import { useModal } from 'src/hooks/useModal';
import { TableEnum } from 'src/models';
import StatusSelect from 'src/components/StatusSelect';


const LitigationsTable: FC<TableProps<Litigation>> = ({
  items: litigations, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleDeleteItem,
  statusOptions
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
              <TableCell align="left">Mission</TableCell>
              <TableCell align="left">Auteur</TableCell>
              <TableCell align="left">Cible</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {litigations.map((litigation) => {
              const isLitigationSelected = selectedItems.includes(
                litigation.id
              );
              return (
                <TableRow
                  hover
                  key={litigation.id}
                  selected={isLitigationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLitigationSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, litigation.id)
                      }
                      value={isLitigationSelected}
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
                      <Link to={`/gestion/litiges/${litigation.id}`}>{litigation.litigation_object.label}</Link>
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
                      {litigation.createdAt}
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
                      titre de la mission
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {
                        'firstname' in litigation.author ? `${litigation.author.firstname} ${litigation.author.lastname}` 
                        : litigation.author.title
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {
                        'firstname' in litigation.author ? `${litigation.author.firstname} ${litigation.author.lastname}` 
                        : litigation.author.title
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusSelect table={TableEnum.litigations} currentItem={{ id: litigation.id, status: litigation.status}} statusOptions={statusOptions} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer le litige" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(litigation)}
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
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer l'administrateur suivant : ${deleteModalItem?.firstname} ${deleteModalItem?.lastname}`}>
            <DeleteLitigationContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default LitigationsTable;
