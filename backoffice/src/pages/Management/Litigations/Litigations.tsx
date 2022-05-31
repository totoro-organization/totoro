// @ts-nocheck
import { Card } from '@mui/material';
import { Litigation } from 'src/models/litigation';
import LitigationsTable from './LitigationsTable';
import { subDays } from 'date-fns';
import TableWrapper from 'src/components/TableWrapper';
import { StatusEnum } from 'src/models/status';

function Litigations() {

  const litigations: Litigation[] = [
    {
      id: '1',
      litigation_object: {id: '1', label: 'Language offensant', description: 'Messages à caractère grossier ou injuriant'},
      job: {
        id: '1',
        title: 'Ma super mission',
        organization: 'Mon association',
        status: {id: '1', label: 'coming'},
        participants: 15,
        address: '3 rue de la paix',
        capacity: 20,
        tokens: 150,
        description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
        date: subDays(new Date(), 1).getTime(),
        tags: [{id:'1', label: 'humanitaire'}]
      },
      author: {
        id: '1',
        firstname: 'Téo',
        lastname: 'Lugat',
        username: 'tlugat',
        email: 'teo.lugat@hetic.net',
        jobs: [{
          id: '1',
          title: 'Ma super mission',
          organization: 'Mon association',
          status: {id: '1', label: 'coming'},
          participants: 15,
          address: '3 rue de la paix',
          capacity: 20,
          tokens: 150,
          description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
          date: subDays(new Date(), 1).getTime(),
          tags: [{id:'1', label: 'humanitaire'}]
        }],
        tokens: 150,
        status: {id: '1', label: 'actived'}
      },
      target: {
        id: '1',
        firstname: 'Jarce',
        lastname: 'Boukoro',
        username: 'jarceleboss',
        email: 'jarce.boukoro@hetic.net',
        jobs: [{
          id: '1',
          title: 'Ma super mission',
          organization: 'Mon association',
          status: {id: '1', label: 'completed'},
          participants: 15,
          address: '3 rue de la paix',
          capacity: 20,
          tokens: 150,
          description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
          date: subDays(new Date(), 1).getTime(),
          tags: [{id:'1', label: 'humanitaire'}]
        }],
        tokens: 350,
        status: {id: '1', label: 'actived'}
      },
      date: subDays(new Date(), 1).getTime(),
      status: {id: '2', label: 'opened'},
      message: "Mon message"
  }
  ]

  const statusOptions = [
    {
      id: StatusEnum.opened,
      name: 'Ouvert'
    },
    {
      id: StatusEnum.closed,
      name: 'Fermé'
    },
  ];

  return (
    <Card>
      {/* {
        loading ? <SuspenseLoader/> :
        <TableWrapper statusOptions={statusOptions} items={litigations}>
            <LitigationsTable />
        </TableWrapper>
      } */}
      <TableWrapper statusOptions={statusOptions} items={litigations}>
          <LitigationsTable />
      </TableWrapper>
    </Card>
  );
}

export default Litigations;
