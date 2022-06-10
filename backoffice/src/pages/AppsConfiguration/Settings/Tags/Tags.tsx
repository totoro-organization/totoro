import { Box } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';

import { CommonsUriEnum } from 'src/models/commons';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Tags() {

  const { data: tags, loading  } = useApi(CommonsUriEnum.tags);

  const statusOptions = [
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    },
  ];

  return (
    <WrapperBox>
      {
        loading || !tags ? <SuspenseLoader/> : 
        <TableWrapper addButton url={CommonsUriEnum.tags} statusOptions={statusOptions} defaultItems={tags?.data}>
          {/* @ts-ignore */}
            <TagsTable  />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Tags;
