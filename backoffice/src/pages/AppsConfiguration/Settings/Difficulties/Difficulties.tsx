import { Box, Button } from '@mui/material';
import DifficultiesTable from './DifficultiesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { StatusEnum } from 'src/models';
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CommonsUriEnum } from 'src/models/commons';
import { AddDifficultyContent } from './DifficultyModalContent';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Difficultys() {

  const { data: defaultDifficultys, loading  } = useApi(`/commons/${CommonsUriEnum.difficulties}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: difficulties
  } = useTable({ uri: CommonsUriEnum.difficulties, defaultItems: defaultDifficultys?.data, handleCloseModal: handleCloseAddModal })

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
        Ajouter un difficulty
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={difficulties}>
          {/* @ts-ignore */}
            <DifficultiesTable handleDeleteDifficulty={handleDeleteItem} handleUpdateDifficulty={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un difficulty">
        <AddDifficultyContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default Difficultys;
