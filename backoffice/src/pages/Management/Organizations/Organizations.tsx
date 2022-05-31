// @ts-nocheck
import { Card } from '@mui/material';
import { subDays } from 'date-fns';
import TableWrapper from 'src/components/TableWrapper';
import { Organization } from 'src/models/organization';
import { StatusEnum } from 'src/models/status';
import OrganizationsTable from '../Organizations/OrganizationsTable';

function Organizations() {

  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Maison de la Vie Associative et Citoyenne du 15e arrondissement',
      email: 'mavc15@gmail.com',
      phone: '0768386554',
      address: '22 rue de la Saïda , 75015 Paris',
      jobs: [{
        id: '1',
        title: 'Ma super mission',
        organization: "Une association",
        status: {id: '1', label: 'pending'},
        participants: 15,
        address: '3 rue de la paix',
        capacity: 20,
        tokens: 150,
        description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
        date: subDays(new Date(), 1).getTime(),
        tags: [{id:'1', label: 'humanitaire'}]
      }],
      status: {id: '1', label: 'disabled'}
    }
  ]

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Inactif'
    },
    {
      id: StatusEnum.freezed,
      name: 'Gelé'
    }
  ];

  return (
    <Card>
      {/* {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={organizations}>
            <OrganizationsTable />
        </TableWrapper>
      } */}
      <TableWrapper statusOptions={statusOptions} items={organizations}>
            <OrganizationsTable />
        </TableWrapper>
    </Card>
  );
}

export default Organizations;
