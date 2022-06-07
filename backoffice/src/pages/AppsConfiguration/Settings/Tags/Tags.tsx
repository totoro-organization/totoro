import { Box, Button } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { StatusEnum } from 'src/models/status';
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CommonsUriEnum } from 'src/models/commons';
import { AddTagContent } from './TagModalContent';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Tags() {

  const { data: defaultTags, loading  } = useApi(`/${CommonsUriEnum.tags}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: tags
  } = useTable({ url: CommonsUriEnum.tags, defaultItems: defaultTags?.data, handleCloseModal: handleCloseAddModal })

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      <Button onClick={handleOpenAddModal} size='large' startIcon={<AddCircleOutlineIcon/>} sx={{ alignSelf: 'flex-end'}}  variant="contained">
        Ajouter un tag
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={tags}>
          {/* @ts-ignore */}
            <TagsTable handleDeleteTag={handleDeleteItem} handleUpdateTag={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un tag">
        <AddTagContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default Tags;
