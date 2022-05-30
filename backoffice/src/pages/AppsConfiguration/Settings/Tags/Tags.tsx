// @ts-nocheck
import { Box, Button } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { Tag } from 'src/models/tag';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { StatusEnum } from 'src/models/status';
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Tags() {

  const { data: defaultTags, loading  } = useApi('/commons/tags');

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: tags
  } = useTable({ model: 'tags', defaultItems: defaultTags, handleCloseModal: handleCloseAddModal })

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      <Button sx={{ alignSelf: 'flex-end'}} onClick={handleOpenAddModal} variant="contained">
        Ajouter un tag
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={tags}>
            <TagsTable handleDeleteTag={handleDeleteItem} handleUpdateTag={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal callback={handleAddItem} open={addModalOpen} handleClose={handleCloseAddModal} type="add" title="Ajouter un tag"/>
    </WrapperBox>
  );
}

export default Tags;
