import { FormControl, FormHelperText, TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';


const FormTextarea = ({
  name,
  defaultValue,
  ...props
}: TextareaAutosizeProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <TextareaAutosize
          {...field}
          aria-label="minimum height"
          style={{ width: '100%', height: 150, maxWidth: '' }}
          onChange={(e) => console.log(e)}
          {...props}
        />
        {!!error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
        
      )}
      defaultValue={defaultValue}
    />
  );
};

export default FormTextarea;
