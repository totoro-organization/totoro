import { Box } from '@mui/material';
import PricingsTable from './PricingsTable';
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

function Pricings() {

  const { data: pricings, loading  } = useApi(CommonsUriEnum.pricings);

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
        loading || !pricings ? <SuspenseLoader/> : 
        <TableWrapper url={CommonsUriEnum.pricings} statusOptions={statusOptions} defaultItems={pricings?.data}>
          {/* @ts-ignore */}
            <PricingsTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Pricings;
