// @ts-nocheck
import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import { useTable } from 'src/hooks/useTable';

function Users() {

  const { data: defaultUsers, loading } = useApi('/users');

  const {
    handleDeleteItem,
    items: users
  } = useTable({ url: '/users', defaultItems: defaultUsers?.data })

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
      name: 'Gelé'
    },
    {
      id: StatusEnum.disabled,
      name: 'Désactivé'
    },
  ];

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={users}>
          <UsersTable/>
        </TableWrapper>
      }
    </Card>
  );
}

export default Users;
