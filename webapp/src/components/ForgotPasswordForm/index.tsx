import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormContainer, FormTextField } from 'src/components/forms';
import { useToast } from 'src/hooks/useToast';
import { forgotPassword } from 'src/api/auth';
import { ForgotPasswordSchema } from './ForgotPassword.schema';
import { APP_PATHS } from 'src/appPaths';

interface ForgotPasswordFieldTypes {
  email: string;
}

function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFieldTypes>({
    resolver: yupResolver(ForgotPasswordSchema)
  });
  const { setToast } = useToast();
  const onSubmit = async (formData: ForgotPasswordFieldTypes) => {
    const data = {
      email: formData.email
    };
    const response = await forgotPassword(data);
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
      message: 'Votre demande à été envoyée avec succès. Veuillez vérifier votre boite mail',
      duration: 8000
    });

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
          to={APP_PATHS.LOGIN}
          variant="body2"
        >
          J'avais juste oublié ! Je me connecte
        </Link>
      </FormContainer>
    </FormProvider>
  );
}

export default ForgotPasswordForm;
