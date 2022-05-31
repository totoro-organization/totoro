// @ts-nocheck
import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import TableWrapper from 'src/components/TableWrapper';
import { MembershipRequest } from 'src/models/membership_request';
import { StatusEnum } from 'src/models/status';
import MembershipRequestsTable from './MembershipRequestsTable';

function MembershipRequests() {
  const requests: MembershipRequest[] = [
    {
      id: '1',
      partner: {
        id: '1',
        name: 'Boulangerie Le fournil de Carole',
        email: 'lefournildecarole@gmail.com',
        phone: '0769086554',
        address: '54 rue croix nivert, 75015 Paris',
        discount: [],
        status: { id: '1', label: 'actived' }
      },
      date: subDays(new Date(), 1).getTime(),
      status: { id: '5', label: 'opened' }
    }
  ];

  const statusOptions = [
    {
      id: StatusEnum.pending,
      name: 'Actif'
    },
    {
      id: StatusEnum.accepted,
      name: 'Inactif'
    },
    {
      id: StatusEnum.denied,
      name: 'Gelé'
    }
  ];

  return (
    <Card>
      {/* {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={requests}>
            <MembershipRequestsTable />
        </TableWrapper>
      } */}
      <TableWrapper statusOptions={statusOptions} items={requests}>
          <MembershipRequestsTable />
      </TableWrapper>
    </Card>
  );
}

export default MembershipRequests;
