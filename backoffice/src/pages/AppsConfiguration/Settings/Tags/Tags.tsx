// @ts-nocheck
import { Card } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';

function Tags() {

  const { data: users, loading } = useApi('/users');

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TagsTable users={users?.data} />
      }
    </Card>
  );
}

export default Tags;
