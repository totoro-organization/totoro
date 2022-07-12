import { Button, MenuItem } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormInputFile, FormSelect, FormTextarea } from 'src/components/forms';
import { JobFormSchema } from './JobForm.schema';
import {
  FormAutocomplete,
  FormTextField,
  FormDateTimeRangePicker
} from 'src/components/forms';
import { useContext } from 'react';
import { CommonsContext } from 'src/contexts/CommonsContext';
import { sortObjectArrayByAscOrder } from 'src/utils/sortByAscOrder';
import type { JobDifficulty, Tag } from 'src/models';
import format from 'date-fns/format';
import AddIcon from '@mui/icons-material/Add';

interface JobFormFieldTypes {
  start_date: Date
  end_date: Date
  nb_participants: number,
  description: string,
  tags: Tag[],
  category: Tag,
  difficulty: JobDifficulty["id"],
  title: string,
  images: string[]
}

interface JobFormData {
  start_date: string,
  end_date: string,
  nb_participants: number,
  description: string,
  tags: Tag["id"][],
  difficulty: JobDifficulty['id'],
  title: string,
  images: string[]
}

const JobForm = () => {
  
  const methods = useForm<JobFormFieldTypes>({ resolver: yupResolver(JobFormSchema) });
  const { tags, difficulties, categories } = useContext(CommonsContext);

  const onSubmit = (formData: JobFormFieldTypes) => {
    const tagsId = formData.tags.map((tag: Tag) => tag.id);
    const data: JobFormData = {
      start_date: format(formData.start_date, 'yyyy-MM-dd HH:mm'),
      end_date: format(formData.end_date, 'yyyy-MM-dd HH:mm'),
      tags: [...tagsId, formData.category.id],
      title: formData.title,
      nb_participants: formData.nb_participants,
      description: formData.description,
      difficulty: formData.difficulty,
      images: formData.images
    }
    console.log(data)
  };

  console.log(methods.formState.errors)
  
  const ascDifficulties: JobDifficulty[] = sortObjectArrayByAscOrder(
    difficulties,
    'level'
  );

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
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
        defaultValue={ascDifficulties[0] ?? ""}
      >
        {ascDifficulties.map((difficulty: JobDifficulty) => (
          <MenuItem key={difficulty.id} value={difficulty.id}>
            {`${difficulty.level} (${difficulty.token} tokens)`}
          </MenuItem>
        ))}
      </FormSelect>
        <FormDateTimeRangePicker name="date"/>
        <FormTextField
          inputProps={{ min: 0 }}
          type="number"
          defaultValue={0}
          label="Nombre de participants"
          name="nb_participants"
        />
        <FormTextarea
          placeholder="Description"
          name="description"
        />
        <FormInputFile startIcon={<AddIcon/>} name="images" multiple buttonLabel='Ajouter des images'/>
        <Button type="submit">Submit</Button>
        <Button onClick={() => methods.reset()} variant={'outlined'}>
          Reset
        </Button>
      </FormContainer>
    </FormProvider>
  );
};

export default JobForm;
