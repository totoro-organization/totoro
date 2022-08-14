import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { FormContainer, FormTextField } from 'src/components/forms';
import { useToast } from 'src/hooks/useToast';
import { resetPasswordUser } from 'src/api/users';
import { ResetPasswordSchema } from './ResetPassword.schema';

interface ResetPasswordFieldTypes {
  password: string;
  passwordConfirmation: string;
}

interface ResetPasswordFormProps {
  setIsValidate: (bool: boolean) => void
}

function ResetPasswordForm({ setIsValidate }: ResetPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const methods = useForm<ResetPasswordFieldTypes>({
    resolver: yupResolver(ResetPasswordSchema)
  });
  const { setToast } = useToast();
  const token = searchParams.get('access_token');

  const onSubmit = async (formData: ResetPasswordFieldTypes) => {

    if (formData.password === formData.passwordConfirmation && token) {
      const data = {
        token: decodeURIComponent(token),
        password: formData.password
      };
      const response = await resetPasswordUser(data);
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
        message: 'Votre mot de passe à été modifié avec succès',
        duration: 8000
      });
      setIsValidate(true);
    }
  };

  // if(!token) return <Navigate to="/" replace />

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextField
          defaultValue={''}
          margin="normal"
          fullWidth
          name="password"
          label="Nouveau mot de passe"
          type="password"
          id="password"
          autoComplete="password"
        />
        <FormTextField
          defaultValue={''}
          margin="normal"
          fullWidth
          name="passwordConfirmation"
          label="Confirmer le mot de passe"
          type="password"
          id="passwordConfirmation"
          autoComplete="passwordConfirmation"
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
      </FormContainer>
    </FormProvider>
  );
}

export default ResetPasswordForm;
