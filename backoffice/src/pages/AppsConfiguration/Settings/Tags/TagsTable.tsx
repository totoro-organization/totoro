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
  Modal,
  Box,
  Button,
  TextField
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Tag } from 'src/models/tag';


const EditTagModal = ({open, handleClose, tag, handleUpdate}) => {

  const [label, setLabel] = useState(tag?.label);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
    <Box sx={{ ...style, width: 400 }}>
      <h2 id="child-modal-title">Editer le tag suivant : { tag?.label }</h2>
      <TextField
        required
        id="tag_label"
        label="Label"
        defaultValue={tag?.label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Button variant="outlined" onClick={handleClose}>Annuler</Button>
      <Button variant="contained" onClick={() => handleUpdate(tag?.id, label)}>Confirmer</Button>
    </Box>
  </Modal>
  )
  
}


interface TagsTableProps {
  items: Tag[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any,
  handleReload: () => void
}

const TagsTable: FC<TagsTableProps> = ({
  items: tags, 
  setItems: setTags,
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateTag
}) => {

  const [openModal, setOpenModal] = useState(false);

  const [modalInfo, setModalInfo] = useState<Tag | null>(null);
  
  const theme = useTheme();

  const handleOpenModal = (tag: Tag) => {
    setOpenModal(true);
    setModalInfo(tag);
  }

  const handleCloseModal = () => setOpenModal(false);

  const handleUpdate = (tagId, label) => {
    handleUpdateTag(tagId, label);
    handleCloseModal();
  }

  // const handleUpdateTag = async (tagId, label) => {
  //   const updateResponse = await updateTag(tagId, { label });
  //   if('error' in updateResponse) return;
  //   handleCloseModal();
  //   handleReload();
  //   // const tags = await getTags();
  //   // if('error' in updateResponse) return;
  //   // setTags(tags);
  // }

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
                          onClick={() => handleOpenModal(tag)}
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
        <EditTagModal tag={modalInfo} handleUpdate={handleUpdate} open={openModal} handleClose={handleCloseModal}/>
      </TableContainer>
  );
};

export default TagsTable;
