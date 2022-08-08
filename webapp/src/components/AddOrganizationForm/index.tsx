import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FormContainer, FormTextField } from 'src/components/forms';
import { useToast } from 'src/hooks/useToast';
import { AddOrganizationData } from 'src/models/services';
import { addItem } from 'src/services/common.service';
import { API_ROUTES } from 'src/services/routes';
import { AddOrganizationSchema } from './AddOrganization.schema';

interface AddOrganizationFieldTypes {
  type: "siret" | "siren",
  typeValue: string,
  email: string,
  phone: number
}

function AddOrganizationForm() {
  const methods = useForm<AddOrganizationFieldTypes>({
    resolver: yupResolver(AddOrganizationSchema)
  });
  const { setToast } = useToast();
  const onSubmit = async (formData: AddOrganizationFieldTypes) => {
    const data: AddOrganizationData = {
      type: formData.type,
      typeValue: formData.typeValue,
      email: formData.email,
      phone: formData.phone
    };
    const response = await addItem(API_ROUTES.ORGANIZATIONS, data);
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
      message: 'Votre demande à été envoyée avec succès. Vous serez notifié quand elle sera sera acceptée ou refusée',
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
          name="typeValue"
          label="N°SIREN/SIRET"
          type="number"
          id="typeValue"
          autoComplete="current-type"
        />
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
        <FormTextField
          defaultValue={''}
          margin="normal"
          fullWidth
          name="phone"
          label="N° de téléphone"
          type="phone"
          id="phone"
          autoComplete="current-phone"
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

export default AddOrganizationForm;
