import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormSelect, FormTextarea } from 'src/components/forms';
import { JobFormData, JobFormSchema } from './JobFormSchema';
import { FormAutocomplete, FormTextField, FormDatePickerDuo, FormDateTimePicker } from 'src/components/forms';
import { useContext } from 'react';
import { CommonsContext } from 'src/contexts/CommonsContext';
import { sortObjectArrayByAscOrder } from 'src/utils/sortByAscOrder';
import type { JobDifficulty, Tag } from 'src/models';

const JobForm = () => {
  const { handleSubmit, reset, control, formState: { errors } } = useForm<JobFormData>({resolver: yupResolver(JobFormSchema)});
  const { tags, difficulties, categories } = useContext(CommonsContext);

  const onSubmit = (data: JobFormData) => console.log(data);
  const ascDifficulties: JobDifficulty[] = sortObjectArrayByAscOrder(difficulties, "level");

  return (
    <FormContainer>
      <FormTextField defaultValue="" control={control} label="Titre" name="title"/>
      <FormAutocomplete multiple options={tags} defaultValue={[]} control={control} label="Tags" name="tags" />
      <FormAutocomplete options={categories} defaultValue={null} control={control} label="Catégories" name="category" />
      {/* <FormSelect defaultValue={ascDifficulties[0].id} control={control} options={ascDifficulties} label="Difficulté" name="difficulty"/> */}
      {/* <DatePickerDuo control={control} /> */}
      <FormTextField inputProps={{min: 0}} type="number" defaultValue={0} control={control} label="Nombre de participants" name="nb_participants" />
      <FormTextarea placeholder="Description" control={control} name="description"/>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        Reset
      </Button>
    </FormContainer>
  );
};

export default JobForm
