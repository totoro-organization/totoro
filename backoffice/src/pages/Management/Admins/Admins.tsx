import AdminsTable from './AdminsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';

import { TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';


function Admins() {

  const { data: admins, loading  } = useApi(API_ROUTES.ADMINS);

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
      <TableWrapper table={TableEnum.admins} url={API_ROUTES.ADMINS} statusOptions={statusOptions} defaultItems={admins?.data}>
        {/* @ts-ignore */}
          <AdminsTable />
      </TableWrapper>
  );
}

export default Admins;
