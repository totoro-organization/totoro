import { Box } from '@mui/material';
import RolesTable from './RolesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';
import { CommonsUriEnum } from 'src/models/commons';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Roles() {

  const { data: roles, loading  } = useApi(CommonsUriEnum.roles);

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
        <TableWrapper addButton url={CommonsUriEnum.roles} statusOptions={statusOptions} defaultItems={roles?.data}>
            {/* @ts-ignore */} 
            <RolesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Roles;
