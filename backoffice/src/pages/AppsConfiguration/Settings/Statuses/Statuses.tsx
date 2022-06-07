import { Box, Button } from '@mui/material';
import StatusesTable from './StatusesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CommonsUriEnum } from 'src/models/commons';
import { AddStatusContent } from './StatusModalContent';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Statuses() {

  const { data: defaultStatuses, loading  } = useApi(`/${CommonsUriEnum.status}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: statuses
  } = useTable({ url: CommonsUriEnum.status, defaultItems: defaultStatuses?.data, handleCloseModal: handleCloseAddModal })

  return (
    <WrapperBox>
      <Button onClick={handleOpenAddModal} size='large' startIcon={<AddCircleOutlineIcon/>} sx={{ alignSelf: 'flex-end'}}  variant="contained">
        Ajouter un status
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper items={statuses}>
          {/* @ts-ignore */}
            <StatusesTable handleDeleteStatus={handleDeleteItem} handleUpdateStatus={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un statut">
        <AddStatusContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default Statuses;
