import { Box } from '@mui/material';
import ApplicationsTable from './ApplicationsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';
import { TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Applications() {

  const { data: applications, loading  } = useApi(API_ROUTES.APPLICATIONS);

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: "Inactif"
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      {
        loading || !applications ? <SuspenseLoader/> : 
        <TableWrapper table={TableEnum.applications} url={API_ROUTES.TAGS} statusOptions={statusOptions} defaultItems={applications?.data}>
          {/* @ts-ignore */}
            <ApplicationsTable  />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Applications;
