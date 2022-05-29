// @ts-nocheck
import { Box, Button } from '@mui/material';
import TagsTable from './TagsTable';
import { useApi } from 'src/hooks/useApi';
import SuspenseLoader from 'src/components/SuspenseLoader';
import TableWrapper from 'src/components/TableWrapper';
import { useEffect, useState } from 'react';
import { updateTag, getTags, addTag, deleteTag } from 'src/services/tags.service';
import { Tag } from 'src/models/tag';
import { styled } from '@mui/system';
import Modal from "src/components/Modal";

const WrapperBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacing(2)}
`
);

function Tags() {

  const { data: defaultTags, loading  } = useApi('/commons/tags');

  const [tags, setTags] = useState<Array<Tag>>(defaultTags?.data);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (tag: Tag) => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if(defaultTags?.data) {
      setTags(defaultTags?.data);
    }
  }, [defaultTags])

  const handleGetTags = async () => {
    const tagsResponse = await getTags();
    if('error' in tagsResponse) return;
    setTags(tagsResponse?.data);
  }
 
  const handleUpdateTag = async ({id, label}: {id: string, label: string}) => {
    const updateResponse = await updateTag(id, { label });
    if('error' in updateResponse) return;
    handleGetTags();
  }

  const handleDeleteTag = async (id) => {
    const deleteResponse = await deleteTag(id);
    if('error' in deleteResponse) return;
    handleGetTags();
  }

  const handleAddTag = async ({label}: string) => {
    const addResponse = await addTag({ label });
    if('error' in addResponse) return;
    handleCloseModal();
    handleGetTags();
  }

  return (
    <WrapperBox>
      <Button sx={{ alignSelf: 'flex-end'}} onClick={handleOpenModal} variant="contained">
        Ajouter un tag
      </Button>
      {
        loading ? <SuspenseLoader/> : 
        <TableWrapper items={tags}>
            <TagsTable handleDeleteTag={handleDeleteTag} handleUpdateTag={handleUpdateTag} />
        </TableWrapper>
      }
      <Modal callback={handleAddTag} open={openModal} handleClose={handleCloseModal} type="add" title="Ajouter un tag"/>
    </WrapperBox>
  );
}

export default Tags;
