import { Box } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { styled } from '@mui/system';
import { StatusEnum } from 'src/models/status';
import { TableEnum } from 'src/models';
import { API_ROUTES } from 'src/services/routes';


const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Tags() {

  const { data: tags, loading  } = useApi(API_ROUTES.TAGS);

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
        <TableWrapper table={TableEnum.tags} addButton url={API_ROUTES.TAGS} statusOptions={statusOptions} defaultItems={tags?.data}>
          {/* @ts-ignore */}
            <TagsTable  />
        </TableWrapper>
      }
    </WrapperBox>
  );
}

export default Tags;
