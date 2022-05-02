import { Card } from '@mui/material';
import { Organization } from 'src/models/organization';
import OrganizationsTable from '../Organizations/OrganizationsTable';
import { subDays } from 'date-fns';

function Organizations() {

  const organizations: Organization[] = [
    // {
    //   id: '1',
    //   title: 'Ma super mission',
    //   organization: 'Mon association',
    //   status: 'completed',
    //   participants: 15,
    //   address: '3 rue de la paix',
    //   capacity: 20,
    //   tokens: 150,
    //   desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
    //   date: subDays(new Date(), 1).getTime(),
    //   tags: ['humanitaire']
    // }
  ]

  return (
    <Card>
      {/* <OrganizationsTable organizations={organizations} /> */}
    </Card>
  );
}

export default Organizations;
