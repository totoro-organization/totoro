import { Box, Button } from '@mui/material';
import PricingsTable from './PricingsTable';
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
import { AddPricingContent } from './PricingModalContent';
import { COMMONS_BASE_URL } from 'src/services/commons.service';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Pricings() {

  const { data: defaultPricings, loading  } = useApi(`${COMMONS_BASE_URL}/${CommonsUriEnum.pricings}`);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: pricings
  } = useTable({ uri: CommonsUriEnum.pricings, defaultItems: defaultPricings?.data, handleCloseModal: handleCloseAddModal })

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
        Ajouter un pricing
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={pricings}>
          {/* @ts-ignore */}
            <PricingsTable handleDeletePricing={handleDeleteItem} handleUpdatePricing={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un pricing">
        <AddPricingContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
      </Modal>
    </WrapperBox>
  );
}

export default Pricings;
