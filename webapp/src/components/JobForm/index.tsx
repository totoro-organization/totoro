import { Box, Button, MenuItem } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormContainer,
  FormAutocomplete,
  FormTextField,
  FormDateTimeRangePicker,
  FormSelect,
  FormTextarea,
  UploadImagePreview,
  FormUpload
} from 'src/components/forms';
import { JobFormSchema } from './JobForm.schema';
import { useContext } from 'react';
import { CommonsContext } from 'src/contexts/CommonsContext';
import { sortObjectArrayByAscOrder } from 'src/utils/sortByAscOrder';
import type { JobDifficulty, Tag } from 'src/models';
import format from 'date-fns/format';
import AddIcon from '@mui/icons-material/Add';
import { addItem, getItems } from 'src/services/common.service';
import { API_ROUTES } from 'src/services/routes';
import { useSession } from 'src/hooks/useSession';
import RefreshIcon from '@mui/icons-material/Refresh';

interface JobFormFieldTypes {
  start_date: Date;
  end_date: Date;
  nb_participants: number;
  description: string;
  tags: Tag[];
  category: Tag;
  difficulty: JobDifficulty['id'];
  title: string;
  images: FileList;
}

interface JobFormData {
  start_date?: string;
  end_date: string;
  nb_participants: number;
  description: string;
  tags: Tag['id'][];
  difficulty: JobDifficulty['id'];
  title: string;
  images: FileList;
  assos_user_id: string
}

const JobForm = () => {
  //@ts-ignore
  const methods = useForm<JobFormFieldTypes>({
    resolver: yupResolver(JobFormSchema)
  });
  const { currentApp } = useSession();

  const { tags, difficulties, categories } = useContext(CommonsContext);

  const onSubmit = async (formData: JobFormFieldTypes) => {
    const tagsId = formData.tags.map((tag: Tag) => tag.id);
    console.log(formData.start_date, formData.end_date);
    
    const data: JobFormData = {
      start_date: format(new Date(formData.start_date), 'yyyy-MM-dd HH:mm'),
      end_date: format(new Date(formData.end_date), 'yyyy-MM-dd HH:mm'),
      tags: [...tagsId, formData.category.id],
      title: formData.title,
      nb_participants: formData.nb_participants,
      description: formData.description,
      difficulty: formData.difficulty,
      images: formData.images,
      assos_user_id: currentApp.member_id
    };
    // const response = await addItem(API_ROUTES.JOBS, data);
    console.log(data);
    
  };

  const ascDifficulties: JobDifficulty[] = sortObjectArrayByAscOrder(
    difficulties,
    'level'
  );

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent={"flex-end"}>
          <Button  startIcon={<RefreshIcon/>} onClick={() => methods.reset()} variant={'text'}>
            Réinitialiser
          </Button>
        </Box>
          
        <FormTextField autoFocus={true} defaultValue="" label="Titre" name="title" />
        <FormAutocomplete
          multiple
          options={tags}
          label="Tags"
          name="tags"
          getOptionLabel={(option) => option.label}
          defaultValue={[]}
        />
        <FormAutocomplete
          options={categories}
          label="Catégories"
          name="category"
          getOptionLabel={(option) => option.label}
          defaultValue={null}
        />
        <FormSelect
          label="Difficulté"
          name="difficulty"
          defaultValue={ascDifficulties[0].id ?? ''}
        >
          {ascDifficulties && ascDifficulties.map((difficulty: JobDifficulty) => (
            <MenuItem key={difficulty.id} value={difficulty.id}>
              {`${difficulty.level} (${difficulty.token} tokens)`}
            </MenuItem>
          ))}
        </FormSelect>
        <FormDateTimeRangePicker name="date" />
        <FormTextField
          inputProps={{ min: 0 }}
          type="number"
          defaultValue={0}
          label="Nombre de participants"
          name="nb_participants"
        />
        <FormTextarea placeholder="Décrivez la mission ! (50 caractères min.)" name="description" />
        <FormUpload buttonLabel='Ajouter une image' name="images" multiple startIcon={<AddIcon/>}/>
        {/* <UploadImagePreview
          name="images"
          multiple
        /> */}
        <Box display="flex" justifyContent={"center"}>
          <Button variant="contained" color="primary" type="submit">Créer une mission</Button>
        </Box>
      </FormContainer>
    </FormProvider>
  );
};

export default JobForm;
