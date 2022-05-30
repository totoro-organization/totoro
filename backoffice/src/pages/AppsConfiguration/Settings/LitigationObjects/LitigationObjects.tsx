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

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function LitigationObjects() {

  const { data: defaultLitigationObjects, loading  } = useApi('/commons/litigation-objects');

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: litigationObjects
  } = useTable({ model: 'litigation-objects', defaultItems: defaultLitigationObjects, handleCloseModal: handleCloseAddModal })

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
      <Button size='large' startIcon={<AddCircleOutlineIcon/>} sx={{ alignSelf: 'flex-end'}} onClick={handleOpenAddModal} variant="contained">
        Ajouter un objet de litige
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={litigationObjects}>
            <LitigationObjectsTable handleDeleteLitigationObject={handleDeleteItem} handleUpdateLitigationObject={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal callback={handleAddItem} open={addModalOpen} handleClose={handleCloseAddModal} type="add" title="Ajouter un objet de litige"/>
    </WrapperBox>
  );
}

export default LitigationObjects;
