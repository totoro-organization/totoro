import { FC, ChangeEvent } from 'react';
import { format } from 'date-fns';

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
import type { Tag, TableProps } from 'src/models';
import Modal from 'src/components/Modal';
import StatusLabel from 'src/components/StatusLabel';
import { useModal } from 'src/hooks/useModal';
import { AddTagContent, DeleteTagContent, EditTagContent } from './TagModalContent';

const TagsTable: FC<TableProps<Tag>> = ({
  items: tags, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateItem,
  handleDeleteItem,
  handleAddItem,
  addModalOpen,
  handleCloseAddModal
}) => {

  const [editModalOpen, handleOpenEditModal, handleCloseEditModal, editModalItem] = useModal();
  const [deleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteModalItem] = useModal();

  const theme = useTheme();

  const handleUpdate = (id: string, data: object) => {
    handleUpdateItem(id, data);
    handleCloseEditModal();
  }

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
              <TableCell>Label</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tags.map((tag) => {
              const isUserSelected = selectedItems.includes(tag.id);
              return (
                <TableRow hover key={tag.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, tag.id)
                      }
                      value={isUserSelected}
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
                      { tag.label }
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
                      {format(new Date(tag.createdAt), "dd/MM/yyyy HH:mm:ss")} 
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={tag.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer la mission" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(tag)}
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
                    <Tooltip title="Supprimer le tag" arrow>
                      <IconButton
                      onClick={() => handleOpenDeleteModal(tag)}
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
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer le tag suivant : ${editModalItem?.label}`}>
            <EditTagContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer le tag suivant : ${deleteModalItem?.label}`}>
            <DeleteTagContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
        <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un tag">
        <AddTagContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
      </TableContainer>
  );
};

export default TagsTable;
