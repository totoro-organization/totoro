import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormContainer, FormTextField } from 'src/components/forms';
import { ForgotPasswordSchema } from './ForgotPassword.schema';

interface ForgotPasswordFieldTypes {
  email: string;
}

function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFieldTypes>({
    resolver: yupResolver(ForgotPasswordSchema)
  });

  const onSubmit = (formData: ForgotPasswordFieldTypes) => {
    const data = {
      email: formData.email
    };
  };

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextField
          defaultValue={''}
          margin="normal"
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="current-email"
        />
        <Button
          //   disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Réinitialiser
        </Button>
        <Link
          component={NavLink}
          to="/login"
          variant="body2"
        >
          J'avais juste oublié ! Je me connecte
        </Link>
      </FormContainer>
    </FormProvider>
  );
}

export default ForgotPasswordForm;
