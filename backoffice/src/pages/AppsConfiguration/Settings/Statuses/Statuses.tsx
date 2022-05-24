// @ts-nocheck
import { Card } from '@mui/material';
import StatusesTable from './StatusesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Users() {

  const { data: users, loading } = useApi('/users');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <StatusesTable users={users?.data} />
      }
    </Card>
  );
}

export default Users;
