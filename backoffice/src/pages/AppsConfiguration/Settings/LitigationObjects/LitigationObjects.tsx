// @ts-nocheck
import { Card } from '@mui/material';
import LitigationObjectsTable from './LitigationObjectsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Subscriptions() {

  const { data: users, loading } = useApi('/users');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <LitigationObjectsTable users={users?.data} />
      }
    </Card>
  );
}

export default Subscriptions;
