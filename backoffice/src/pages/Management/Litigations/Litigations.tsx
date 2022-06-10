import LitigationsTable from './LitigationsTable';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';

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
  
  return (
    <h2>Commenté en attendant le back</h2>
    // loading || !litigations ? <SuspenseLoader/> : 
    //   <TableWrapper url="/litigations" statusOptions={statusOptions} defaultItems={litigations?.data}>
    //     {/* @ts-ignore */}
    //       <LitigationsTable />
    //   </TableWrapper>
  );
}

export default Litigations;
