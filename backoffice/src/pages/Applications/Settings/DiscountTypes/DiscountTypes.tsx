import { Box } from '@mui/material';
import DiscountTypesTable from './DiscountTypesTable';
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

function DiscountTypes() {

  const { data: discountTypes, loading  } = useApi(API_ROUTES.DISCOUNT_TYPES);

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
        <TableWrapper table={TableEnum.discountTypes} addButton url={API_ROUTES.DISCOUNT_TYPES} statusOptions={statusOptions} defaultItems={discountTypes?.data}>
          {/* @ts-ignore */}
            <DiscountTypesTable />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default DiscountTypes;
