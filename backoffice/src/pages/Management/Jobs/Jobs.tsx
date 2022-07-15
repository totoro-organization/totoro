import { Card } from '@mui/material';
import { Job } from 'src/models/job';
import JobsTable from './JobsTable';
import { subDays } from 'date-fns';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import { TableEnum } from 'src/models';

function Jobs() {

  const { data: jobs, loading } = useApi('/jobs');

  const statusOptions = [
    {
      id: StatusEnum.coming,
      name: 'A venir'
    },
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Inactif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    }
  ];

  return (
    <Card>
      {
        !loading && jobs ? 
          <TableWrapper table={TableEnum.jobs} url="/jobs" statusOptions={statusOptions} defaultItems={jobs?.data}>
          {/* @ts-ignore */} 
            <JobsTable />
          </TableWrapper> : <SuspenseLoader/>
      }
    </Card>
  );
}

export default Jobs;
