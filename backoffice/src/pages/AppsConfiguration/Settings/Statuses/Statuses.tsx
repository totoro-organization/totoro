

import { Box } from '@mui/material';
import StatusesTable from './StatusesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { CommonsUriEnum } from 'src/models/commons';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Statuses() {

  const { data: statuses, loading  } = useApi(CommonsUriEnum.status);

  return (
    <WrapperBox>
      {
        loading || !statuses ? <SuspenseLoader/> : 
        <TableWrapper addButton url={CommonsUriEnum.status} defaultItems={statuses?.data}>
          {/* @ts-ignore */}
            <StatusesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Statuses;
