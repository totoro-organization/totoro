import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Link } from '@mui/material';
import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useSession } from 'src/hooks/useSession';
import { SignUpData } from 'src/models';
import {
  FormContainer,
  FormDatePicker,
  FormTextField
} from 'src/components/forms';
import { SignupSchema } from './Signup.schema';

interface SignupFieldTypes {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  birthday: Date;
}

function SignupForm() {
  const methods = useForm<SignupFieldTypes>({
    resolver: yupResolver(SignupSchema)
  });

  const { signup, loading } = useSession();

  const onSubmit = (formData: SignupFieldTypes) => {
    const data: SignUpData = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
      birthday: format(new Date(formData.birthday), 'yyyy-MM-dd')
    };    
    signup(data);
  };
  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              autoComplete="given-name"
              name="firstname"
              fullWidth
              id="firstName"
              label="Prénom"
              defaultValue=""
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              fullWidth
              id="lastName"
              label="Nom"
              name="lastname"
              defaultValue=""
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              fullWidth
              name="username"
              label="Pseudo"
              type="username"
              id="username"
              defaultValue=""
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              fullWidth
              id="email"
              label="Adresse mail"
              name="email"
              defaultValue=""
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              defaultValue=""
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormDatePicker defaultValue={null} label="Date de naissance" name="birthday" />
          </Grid>

          {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
        </Grid>
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          S'inscrire
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" component={NavLink} variant="body2">
              Déjà inscrit ? Je me connecte
            </Link>
          </Grid>
        </Grid>
      </FormContainer>
    </FormProvider>
  );
}

export default SignupForm;
