import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { JobDifficulty } from 'src/models';

function FormSelect({ name, label, options, ...props }) {
  console.log(props.defaultValue);

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Select
            fullWidth
            required
            label={label}
            onChange={(_, data) => field.onChange(data)}
            error={!!error}
          >
            {options.map((difficulty: JobDifficulty) => (
              <MenuItem key={difficulty.id} value={difficulty.id}>
                {`${difficulty.level} (${difficulty.token} tokens)`}
              </MenuItem>
            ))}
          </Select>
        )}
        {...props}
      />
    </FormControl>
  );
}

export default FormSelect;
