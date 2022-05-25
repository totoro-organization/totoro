// @ts-nocheck
import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import { User } from 'src/models/user';
import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Admins() {

  const { data: admins, loading } = useApi('/admins');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <AdminsTable admins={admins?.data} />
      }
    </Card>
  );
}

export default Admins;
