import { Card } from '@mui/material';
import { Job } from 'src/models/job';
import JobsTable from './JobsTable';
import { subDays } from 'date-fns';

function Jobs() {

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Ma super mission',
      organization: "Une association",
      status: {id: '1', label: 'pending'},
      participants: 15,
      address: '3 rue de la paix',
      capacity: 20,
      tokens: 150,
      desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur accumsan suscipit. Etiam lacus elit, condimentum ut orci eu, vulputate tincidunt velit. Aenean ac suscipit quam, sit amet tempus risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at erat magna. Nam bibendum sem sem, sit amet sagittis mi tincidunt et. Nulla at vehicula tortor. Etiam faucibus rhoncus nibh eget vulputate. Suspendisse sit amet lacus laoreet mi lacinia porttitor. Nam sapien lacus, tincidunt in odio ut, scelerisque laoreet lorem. Etiam in porta tortor. Nunc venenatis elit nec nulla egestas semper. Cras rhoncus velit id ipsum maximus, ac egestas enim vestibulum. Ut nec pharetra turpis. Morbi iaculis bibendum nisl et vulputate. ',
      date: subDays(new Date(), 1).getTime(),
      tags: [{id:'1', label: 'humanitaire'}]
    }
  ]

  return (
    <Card>
      <JobsTable jobs={jobs} />
    </Card>
  );
}

export default Jobs;
