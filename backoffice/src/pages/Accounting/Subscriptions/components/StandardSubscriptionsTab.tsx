import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useApi } from 'src/hooks/useApi';
import { TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';
import SubscriptionsTable from './SubscriptionsTable';

const statusOptions = [
  {
    id: StatusEnum.actived,
    name: 'Actif'
  },
  {
    id: StatusEnum.expired,
    name: 'Expiré'
  },
  {
    id: StatusEnum.canceled,
    name: 'Annulé'
  }
];

function StandardSubscriptionTab() {

  const { data: subscriptions, loading } = useApi(API_ROUTES.SUBSCRIPTIONS);
  
  console.log(subscriptions);
  
  return !loading && subscriptions ?(
          <TableWrapper table={TableEnum.subscriptions} url={API_ROUTES.SUBSCRIPTIONS} statusOptions={statusOptions} defaultItems={subscriptions?.data}>
          {/* @ts-ignore */} 
            <SubscriptionsTable />
          </TableWrapper> 
  ): <SuspenseLoader/>;
}

export default StandardSubscriptionTab;
