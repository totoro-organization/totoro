import { Box } from '@mui/material';
import LitigationObjectsTable from './LitigationObjectsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum, TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function LitigationObjects() {

  const { data: litigationObjects, loading  } = useApi(API_ROUTES.LITIGATION_OBJECTS);

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
        loading || !litigationObjects ? <SuspenseLoader/> : 
        <TableWrapper table={TableEnum.litigationObjects} addButton url={API_ROUTES.LITIGATION_OBJECTS} statusOptions={statusOptions} defaultItems={litigationObjects?.data}>
            {/* @ts-ignore */}
            <LitigationObjectsTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default LitigationObjects;
