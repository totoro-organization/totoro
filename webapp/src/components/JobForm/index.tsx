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
  FormUpload
} from 'src/components/forms';
import { JobFormSchema } from './JobForm.schema';
import type { JobDifficulty, Tag } from 'src/models';
import format from 'date-fns/format';
import AddIcon from '@mui/icons-material/Add';
import { useSession } from 'src/hooks/useSession';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDifficulties, useTags } from 'src/api/commons/hooks';
import SuspenseLoader from '../SuspenseLoader';
import PlacesAutocomplete from '../forms/PlacesAutocomplete';
import { addJob } from 'src/api/jobs/requests';
import { useToast } from 'src/hooks/useToast';

interface JobFormFieldTypes {
  start_date: Date;
  end_date: Date;
  participants_max: number;
  description: string;
  tags: Tag[];
  category: Tag;
  difficulty: JobDifficulty['id'];
  title: string;
  images: FileList;
  address: {
    address: string,
    cp: number,
    commune: string,
    longitude: number, 
    latitude: number
  }
}

interface JobFormData {
  start_date?: string;
  end_date?: string;
  participants_max: number;
  description: string;
  tags: Tag['id'][];
  difficulty_id: JobDifficulty['id'];
  title: string;
  images: FileList;
  assos_user_id: string;
  address: string;
  cp: number;
  commune: string;
  longitude: number, 
  latitude: number
}

const JobForm = () => {
  //@ts-ignore
  const methods = useForm<JobFormFieldTypes>({
    resolver: yupResolver(JobFormSchema)
  });
  const { currentApp } = useSession();
  const { setToast } = useToast();
  const { tags, categories, loading: tagsLoading } = useTags();
  const { data: difficulties, loading: difficultiesLoading } =
    useDifficulties();

  const onSubmit = async (formData: JobFormFieldTypes) => {        
    const tagsId = formData.tags.map((tag: Tag) => tag.id);
    const { cp, address, commune, longitude, latitude } = formData.address
    const data: JobFormData = {
      start_date: format(new Date(formData.start_date), 'yyyy-MM-dd HH:mm'),
      end_date: format(new Date(formData.end_date), 'yyyy-MM-dd HH:mm'),
      tags: [...tagsId, formData.category.id],
      title: formData.title,
      participants_max: Number(formData.participants_max),
      description: formData.description,
      difficulty_id: formData.difficulty,
      images: formData.images,
      assos_user_id: currentApp.member_id,
      address,
      commune,
      cp: Number(cp),
      longitude, 
      latitude
    };    
    const response = await addJob(data);
    if ('error' in response) {
      setToast({
        variant: 'error',
        message: response.message,
        duration: 6000
      });
      return;
    }
    setToast({
      variant: 'success',
      message: 'La mission à été crée avec succès',
      duration: 8000
    });
  };

  return !tagsLoading && !difficultiesLoading ? (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent={'flex-end'}>
          <Button
            startIcon={<RefreshIcon />}
            onClick={() => methods.reset()}
            variant={'text'}
          >
            Réinitialiser
          </Button>
        </Box>
        <PlacesAutocomplete name="address" />
        <FormTextField defaultValue="" label="Titre" name="title" />
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
          defaultValue={difficulties[0] ?? ''}
        >
          {difficulties &&
            difficulties.map((difficulty: JobDifficulty) => (
              <MenuItem key={difficulty.id} value={difficulty.id}>
                {`${difficulty.level} (${difficulty.token} tokens)`}
              </MenuItem>
            ))}
        </FormSelect>
        <FormDateTimeRangePicker name="date" />
        <FormTextField
          inputProps={{ min: 1 }}
          type="number"
          defaultValue={1}
          label="Nombre de participants"
          name="participants_max"
        />
        <FormTextarea placeholder="Description" name="description" />
        <FormUpload
          buttonLabel="Ajouter une image"
          name="images"
          multiple
          startIcon={<AddIcon />}
        />
        {/* <UploadImagePreview
          name="images"
          multiple
        /> */}
        <Box display="flex" justifyContent={'center'}>
          <Button variant="contained" color="primary" type="submit">
            Créer une mission
          </Button>
        </Box>
      </FormContainer>
    </FormProvider>
  ) : (
    <SuspenseLoader />
  );
};

export default JobForm;
