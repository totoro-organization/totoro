// @ts-nocheck
import { FC, ChangeEvent, useState } from 'react';
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
import { Tag } from 'src/models/tag';
import Modal from 'src/components/Modal';

interface TagsTableProps {
  items: Tag[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any,
  handleDeleteTag: () => any,
  handleUpdateTag: () => any
}

const TagsTable: FC<TagsTableProps> = ({
  items: tags, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateTag,
  handleDeleteTag
}) => {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<Tag | null>(null);
  
  const theme = useTheme();

  const handleOpenEditModal = (tag: Tag) => {
    setOpenEditModal(true);
    setModalInfo(tag);
  }

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleUpdate = ({id, label}) => {
    handleUpdateTag({id, label});
    handleCloseEditModal();
  }

  const handleOpenDeleteModal = (tag: Tag) => {
    setOpenDeleteModal(true);
    setModalInfo(tag);
  }

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = ({id}) => {
    handleDeleteTag(id);
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
                      {tag.createdAt} 
                    </Typography>
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
        <Modal item={modalInfo} callback={handleUpdate} open={openEditModal} handleClose={handleCloseEditModal} type="edit" title={`Editer le tag suivant : ${modalInfo?.label}`}/>
        <Modal item={modalInfo} callback={handleDelete} open={openDeleteModal} handleClose={handleCloseDeleteModal} type="delete" title={`Supprimer le tag suivant : ${modalInfo?.label}`}/>
      </TableContainer>
  );
};

export default TagsTable;
