import { Box } from '@mui/material';
import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';

import { ADMIN_BASE_URL } from 'src/services/admins.service';

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Admins() {

  const { data: admins, loading  } = useApi(ADMIN_BASE_URL);

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
      loading || !admins ? <SuspenseLoader/> : 
      <TableWrapper url={ADMIN_BASE_URL} statusOptions={statusOptions} defaultItems={admins?.data}>
        {/* @ts-ignore */}
          <AdminsTable />
      </TableWrapper>
  );
}

export default Admins;
