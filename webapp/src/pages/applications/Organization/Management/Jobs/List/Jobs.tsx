import JobsTable from './JobsTable';
import TableWrapper from 'src/components/TableWrapper';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { StatusEnum } from 'src/models';
import { API_ROUTES } from 'src/api/routes';
import { useSession } from 'src/hooks/useSession';
import { useOrganizationJobs } from 'src/api/organizations/hooks/useOrganizationJobs';

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

export default function Jobs() {
  const { currentApp } = useSession();
  const { data: jobs, loading } = useOrganizationJobs(currentApp.data.id);
  
  return jobs && !loading ? (
    <TableWrapper
      url={API_ROUTES.JOBS}
      statusOptions={statusOptions}
      defaultItems={jobs.data.filter(job => job.status.label !== "deleted")}
    >
      {/* TODO: Fix type here. Maybe add optional mention to TableProps */}
      {/* @ts-ignore */}
      <JobsTable />
    </TableWrapper>
  ) : (
    <SuspenseLoader />
  );
}
