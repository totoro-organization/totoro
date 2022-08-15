import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { FormContainer, FormTextField } from 'src/components/forms';
import { useToast } from 'src/hooks/useToast';
import { AddOrganizationData } from 'src/models/services';
import { isSiretValid } from 'src/utils/IsSiretValid';
import { AddOrganizationSchema } from './AddOrganization.schema';
import { addOrganization } from 'src/api/organizations/addOrganization';

interface AddOrganizationFieldTypes {
  siret: string;
  email: string;
  phone: number;
}

function AddOrganizationForm() {
  const methods = useForm<AddOrganizationFieldTypes>({
    resolver: yupResolver(AddOrganizationSchema)
  });
  const { setToast } = useToast();
  const onSubmit = async (formData: AddOrganizationFieldTypes) => {
    if(!isSiretValid(formData.siret)) {
      setToast({
        variant: 'error',
        message: "Une erreur s'est produite : Siret invalide",
        duration: 6000
      });
      return;
    }
    const data: AddOrganizationData = {
      siret: formData.siret,
      email: formData.email,
      phone: formData.phone
    };
    const response = await addOrganization(data);
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
      message:
        'Votre demande à été envoyée avec succès. Vous serez notifié quand elle sera sera acceptée ou refusée',
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
          name="siret"
          label="N°SIRET"
          id="siret"
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
          type="tel"
          id="phone"
          autoComplete="current-phone"
        />
        <Button
          //   disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: 'fit-content' }}
        >
          Envoyer
        </Button>
      </FormContainer>
    </FormProvider>
  );
}

export default AddOrganizationForm;
