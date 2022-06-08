import { Box } from '@mui/material';
import DiscountTypesTable from './DiscountTypesTable';
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

function DiscountTypes() {

  const { data: discountTypes, loading  } = useApi(CommonsUriEnum.discountTypes);

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
        loading || !discountTypes ? <SuspenseLoader/> : 
        <TableWrapper url={CommonsUriEnum.discountTypes} statusOptions={statusOptions} defaultItems={discountTypes?.data}>
          {/* @ts-ignore */}
            <DiscountTypesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default DiscountTypes;
