import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';

import { ADMIN_BASE_URL } from 'src/services/admins.service';
import { TableEnum } from 'src/models';


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
      name: 'Gelé'
    },
    {
      id: StatusEnum.disabled,
      name: 'Désactivé'
    },
  ];

  return (
      loading || !admins ? <SuspenseLoader/> : 
      <TableWrapper table={TableEnum.admins} url={ADMIN_BASE_URL} statusOptions={statusOptions} defaultItems={admins?.data}>
        {/* @ts-ignore */}
          <AdminsTable />
      </TableWrapper>
  );
}

export default Admins;
