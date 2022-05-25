// @ts-nocheck
import { Card } from '@mui/material';
import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';

function Admins() {

  const { data: admins, loading } = useApi('/admins');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TableWrapper items={admins?.data} title="Administrateurs">
          <AdminsTable/>
        </TableWrapper>
      }
    </Card>
  );
}

export default Admins;
