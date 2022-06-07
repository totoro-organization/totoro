import { Box, Button } from '@mui/material';
import DiscountTypesTable from './DiscountTypesTable';
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
import { AddDiscountTypeContent } from './DiscountTypeModalContent';
import { COMMONS_BASE_URL } from 'src/services/commons.service';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function DiscountTypes() {

  const { data: defaultDiscountTypes, loading  } = useApi(`${COMMONS_BASE_URL}/${CommonsUriEnum.discountTypes}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: discountTypes
  } = useTable({ uri: CommonsUriEnum.discountTypes, defaultItems: defaultDiscountTypes?.data, handleCloseModal: handleCloseAddModal })

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
        Ajouter un type de promotion
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={discountTypes}>
          {/* @ts-ignore */}
            <DiscountTypesTable handleDeleteDiscountType={handleDeleteItem} handleUpdateDiscountType={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un type">
        <AddDiscountTypeContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default DiscountTypes;
