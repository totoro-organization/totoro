import { Box } from '@mui/material';
import RolesTable from './RolesTable';
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

function Roles() {

  const { data: roles, loading  } = useApi(API_ROUTES.ROLES);

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      {
        loading || !roles ? <SuspenseLoader/> : 
        <TableWrapper table={TableEnum.roles} addButton url={API_ROUTES.ROLES} statusOptions={statusOptions} defaultItems={roles?.data}>
            {/* @ts-ignore */} 
            <RolesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Roles;
