// @ts-nocheck
import { Card } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { useEffect, useState } from 'react';
import { updateTag, getTags } from 'src/services/tags.service';
import { Tag } from 'src/models/tag';

function Tags() {

  const { data: defaultTags, loading  } = useApi('/commons/tags');

  const [tags, setTags] = useState<Array<Tag>>(defaultTags?.data)

  useEffect(() => {
    if(defaultTags?.data) {
      setTags(defaultTags?.data);
    }
  }, [defaultTags])
 
  const handleUpdateTag = async (tagId, label) => {
    const updateResponse = await updateTag(tagId, { label });
    if('error' in updateResponse) return;
    const tagsResponse = await getTags(tagId, { label });
    if('error' in tagsResponse) return;
    setTags(tagsResponse?.data);
  }

  return (
    <Card>
      {
        loading ? <SuspenseLoader/> :
        <TableWrapper items={tags}>
            <TagsTable handleUpdateTag={handleUpdateTag} />
        </TableWrapper>
      }
    </Card>
  );
}

export default Tags;
