// @ts-nocheck
import { Box, Button } from '@mui/material';
import RolesTable from './RolesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";
import { StatusEnum } from 'src/models/status';
import { useTable } from 'src/hooks/useTable';
import { useModal } from 'src/hooks/useModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CommonsEnum } from 'src/models/commons';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Roles() {

  const { data: defaultRoles, loading  } = useApi('/commons/roles');

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  const {
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    items: roles
  } = useTable({ model: CommonsEnum.roles, defaultItems: defaultRoles?.data, handleCloseModal: handleCloseAddModal })

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
        Ajouter un role
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={roles}>
            <RolesTable handleDeleteRole={handleDeleteItem} handleUpdateRole={handleUpdateItem} />
        </TableWrapper>
      }
      <Modal callback={handleAddItem} open={addModalOpen} handleClose={handleCloseAddModal} type="add" title="Ajouter un role"/>
    </WrapperBox>
  );
}

export default Roles;
