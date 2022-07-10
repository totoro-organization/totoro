// @ts-noCheck
import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormContainer, FormSelect, FormTextarea } from 'src/components/forms';
import { JobFormFieldTypes, JobFormSchema } from './JobFormSchema';
import {
  FormAutocomplete,
  FormTextField,
  FormDatePickerDuo,
} from 'src/components/forms';
import { useContext } from 'react';
import { CommonsContext } from 'src/contexts/CommonsContext';
import { sortObjectArrayByAscOrder } from 'src/utils/sortByAscOrder';
import type { JobDifficulty, Tag } from 'src/models';

// interface IFormDatePickerDuoFieldsTypes {
//   start_date: JobFormFieldTypes["start_date"],
//   end_date: JobFormFieldTypes["end_date"]
// }

const JobForm = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<JobFormFieldTypes>({ resolver: yupResolver(JobFormSchema) });
  const { tags, difficulties, categories } = useContext(CommonsContext);

  const onSubmit = (data: JobFormFieldTypes) => console.log(data);
  const ascDifficulties: JobDifficulty[] = sortObjectArrayByAscOrder(
    difficulties,
    'level'
  );

  return (
    <FormContainer>
      <FormTextField
        defaultValue=""
        control={control}
        label="Titre"
        name="title"
      />
      <FormAutocomplete
        multiple
        options={tags}
        control={control}
        label="Tags"
        name="tags"
      />
      <FormAutocomplete
        options={categories}
        control={control}
        label="Catégories"
        name="category"
      />
      <FormSelect<JobFormFieldTypes>
        defaultValue={ascDifficulties[0].id}
        control={control}
        label="Difficulté"
        name="difficulty"
      >
        {ascDifficulties.map((difficulty: JobDifficulty) => (
          <MenuItem key={difficulty.id} value={difficulty.id}>
            {`${difficulty.level} (${difficulty.token} tokens)`}
          </MenuItem>
        ))}
      </FormSelect>
      <FormDatePickerDuo<JobFormFieldTypes> control={control} />
      <FormTextField
        inputProps={{ min: 0 }}
        type="number"
        defaultValue={0}
        control={control}
        label="Nombre de participants"
        name="nb_participants"
      />
      <FormTextarea
        placeholder="Description"
        control={control}
        name="description"
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        Reset
      </Button>
    </FormContainer>
  );
};

export default JobForm;
