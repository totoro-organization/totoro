

import { Box } from '@mui/material';
import StatusesTable from './StatusesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Statuses() {

  const { data: statuses, loading  } = useApi(API_ROUTES.STATUS);

  return (
    <WrapperBox>
      {
        loading || !statuses ? <SuspenseLoader/> : 
        <TableWrapper table={TableEnum.status} addButton url={API_ROUTES.STATUS} defaultItems={statuses?.data}>
          {/* @ts-ignore */}
            <StatusesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Statuses;
