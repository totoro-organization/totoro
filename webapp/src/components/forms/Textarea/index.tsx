import { FormControl, InputLabel, TextareaAutosize } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormTextarea = ({
  name,
  minRows = 3,
  placeholder = null,
  ...props
}) => {
  return (
      <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          {...field}
          aria-label="minimum height"
          minRows={minRows}
          placeholder={placeholder}
          style={{ width: "100%", height: 150 ,maxWidth: ""}}
        />
      )}
      {...props}
    />
  );
};

export default FormTextarea;
