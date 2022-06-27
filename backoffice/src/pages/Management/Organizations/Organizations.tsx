import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { useApi } from 'src/hooks/useApi';
import { TableEnum } from 'src/models';
import { StatusEnum } from 'src/models/status';
import OrganizationsTable from '../Organizations/OrganizationsTable';

function Organizations() {

  const { data: organizations, loading } = useApi('/organizations');

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
console.log(organizations?.data);

  return (
      loading || !organizations ? <SuspenseLoader/> :
      <TableWrapper table={TableEnum.organizations} url="/organizations" statusOptions={statusOptions} defaultItems={organizations?.data}>
          {/* @ts-ignore */}
          <OrganizationsTable />
      </TableWrapper>
  );
}

export default Organizations;
