import JobsTable from './JobsTable';
import TableWrapper from 'src/components/TableWrapper';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import { StatusEnum } from 'src/models';
import useAuth from 'src/hooks/useAuth';

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

function Jobs() {

  const { currentApp } = useAuth();
  const { data: jobs, loading } = useApi(`/organizations/${currentApp.id}/jobs`);

  return (
        !loading && jobs ? 
          <TableWrapper url="/jobs" statusOptions={statusOptions} defaultItems={jobs?.data}>
          {/* @ts-ignore  */}
            <JobsTable />
          </TableWrapper> : <SuspenseLoader/>
  );
}

export default Jobs;
