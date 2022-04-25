import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import { MembershipRequest } from 'src/models/membership_request';
import MembershipRequestTable from './MembershipRequestsTable';

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
        status: { id: '1', label: 'active' }
      },
      date: subDays(new Date(), 1).getTime(),
      status: { id: '5', label: 'open' }
    }
  ];

  return (
    <Card>
      <MembershipRequestTable membershipRequests={requests} />
    </Card>
  );
}

export default MembershipRequests;
