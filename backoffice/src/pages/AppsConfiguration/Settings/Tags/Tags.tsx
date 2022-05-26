// @ts-nocheck
import { Card } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { useState } from 'react';

function Tags() {

  const { data: tags, loading  } = useApi('/commons/tags');

  const [mustReload, setMustReload] = useState(false);

  const handleReload = () => {
    setMustReload(!mustReload);
  }

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TableWrapper items={tags?.data}>
            <TagsTable handleReload={handleReload} />
        </TableWrapper>
      }
    </Card>
  );
}

export default Tags;
