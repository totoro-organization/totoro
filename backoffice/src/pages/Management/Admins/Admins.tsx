// @ts-nocheck
import { Card } from '@mui/material';
import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { AdminStatus } from 'src/models/admin';
import { StatusEnum } from 'src/models/status';

function Admins() {

  const { data: admins, loading } = useApi('/admins');

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Inactif'
    },
    {
      id: StatusEnum.freezed,
      name: 'Gelé'
    }
  ];

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={admins?.data} title="Administrateurs">
          <AdminsTable/>
        </TableWrapper>
      }
    </Card>
  );
}

export default Admins;
