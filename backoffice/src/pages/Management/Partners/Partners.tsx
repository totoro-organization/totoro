import PartnersTable from './PartnersTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import { TableEnum } from 'src/models';

function Partners() {

  const { data: partners, loading } = useApi('/partners');

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
    {
      id: StatusEnum.pending,
      name: 'En attente'
    },
  ];
  console.log(partners);
  

  return (
      loading || !partners ? <SuspenseLoader/> : 
      <TableWrapper table={TableEnum.partners} url="/partners" statusOptions={statusOptions} defaultItems={partners?.data}>
        {/* @ts-ignore */}
        <PartnersTable />
      </TableWrapper>
  );
}

export default Partners;
