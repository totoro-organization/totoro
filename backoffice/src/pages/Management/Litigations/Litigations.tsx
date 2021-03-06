import LitigationsTable from './LitigationsTable';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import { TableEnum } from 'src/models';

function Litigations() {

  const { data: litigations, loading  } = useApi('/litigations');

  const statusOptions = [
    {
      id: StatusEnum.opened,
      name: 'Ouvert'
    },
    {
      id: StatusEnum.closed,
      name: 'Fermé'
    },
  ];
  console.log(litigations)
  return (
    loading || !litigations ? <SuspenseLoader/> : 
      <TableWrapper table={TableEnum.litigations} url="/litigations" statusOptions={statusOptions} defaultItems={litigations?.data}>
        {/* @ts-ignore */}
          <LitigationsTable />
      </TableWrapper>
  );
}

export default Litigations;
