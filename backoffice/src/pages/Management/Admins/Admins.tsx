import { Box, Button } from '@mui/material';
import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';
import { TableMethods, useTable } from 'src/hooks/useTable';
import { CommonsUriEnum } from 'src/models/commons';
import { COMMONS_BASE_URL } from 'src/services/commons.service';
import { ADMIN_BASE_URL, updateRoleAdmin } from 'src/services/admins.service';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Admins() {

  const { data: defaultAdmins, loading  } = useApi(`${ADMIN_BASE_URL}`);

  const {
    handleDeleteItem,
    handleUpdateItem,
    items: admins
  } = useTable({ url: ADMIN_BASE_URL, defaultItems: defaultAdmins?.data })

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    },
    {
      id: StatusEnum.freezed,
      name: 'Supprimé'
    },
    {
      id: StatusEnum.disabled,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper statusOptions={statusOptions} items={admins}>
          {/* @ts-ignore */}
            <AdminsTable handleDeleteAdmin={handleDeleteItem} handleUpdateAdmin={handleUpdateItem} />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Admins;
