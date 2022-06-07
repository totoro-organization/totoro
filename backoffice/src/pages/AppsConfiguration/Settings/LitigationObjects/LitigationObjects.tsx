// @ts-nocheck
import { Box, Button } from '@mui/material';
import LitigationObjectsTable from './LitigationObjectsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { LitigationObject } from 'src/models/litigationObject';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { StatusEnum } from 'src/models/status';
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CommonsUriEnum } from 'src/models/commons';
import { AddLitigationObjectContent } from './LitigationObjectModalContent';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function LitigationObjects() {

  const { data: defaultLitigationObjects, loading  } = useApi(`/${CommonsUriEnum.litigationObjects}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: litigationObjects
  } = useTable({ url: CommonsUriEnum.litigationObjects, defaultItems: defaultLitigationObjects?.data, handleCloseModal: handleCloseAddModal })

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
      <Button size='large' startIcon={<AddCircleOutlineIcon/>} sx={{ alignSelf: 'flex-end'}} onClick={handleOpenAddModal} variant="contained">
        Ajouter un objet de litige
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={litigationObjects}>
            <LitigationObjectsTable handleDeleteLitigationObject={handleDeleteItem} handleUpdateLitigationObject={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un objet">
        <AddLitigationObjectContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default LitigationObjects;
