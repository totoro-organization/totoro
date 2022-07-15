import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import { TableEnum } from 'src/models';

function Users() {

  const { data: users, loading } = useApi('/users');

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
      loading || !users ? <SuspenseLoader/> :
      <TableWrapper table={TableEnum.users} url="/users" statusOptions={statusOptions} defaultItems={users?.data}>
        {/* @ts-ignore */}
        <UsersTable />
      </TableWrapper>
  );
}

export default Users;
