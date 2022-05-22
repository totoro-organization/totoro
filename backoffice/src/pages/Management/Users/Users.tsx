// @ts-nocheck
import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import { User } from 'src/models/user';
import UsersTable from './UsersTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Users() {

  const { data: users, loading } = useApi('/users');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <UsersTable users={users?.data} />
      }
    </Card>
  );
}

export default Users;
