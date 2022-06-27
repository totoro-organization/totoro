import { Box } from '@mui/material';
import DifficultiesTable from './DifficultiesTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum, TableEnum } from 'src/models';
import { CommonsUriEnum } from 'src/models/commons';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Difficultys() {

  const { data: difficulties, loading  } = useApi(CommonsUriEnum.difficulties);

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
        loading || !difficulties ? <SuspenseLoader/> : 
        <TableWrapper table={TableEnum.difficulties} addButton url={CommonsUriEnum.difficulties} statusOptions={statusOptions} defaultItems={difficulties?.data}>
          {/* @ts-ignore */}
            <DifficultiesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Difficultys;
