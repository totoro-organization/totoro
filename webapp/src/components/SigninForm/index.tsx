import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, Grid, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useSession } from 'src/hooks/useSession';
import { FormContainer, FormTextField } from 'src/components/forms';
import { SigninSchema } from './Signin.schema';

interface SigninFieldTypes {
  emailOrUsername: string;
  password: string;
}

function SigninForm() {
  const methods = useForm<SigninFieldTypes>({
    resolver: yupResolver(SigninSchema)
  });

  const { login, loading } = useSession();

  const onSubmit = (formData: SigninFieldTypes) => {
    const data = {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password
    };
    login(data);
  };
  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextField
        defaultValue={''}
          margin="normal"
          required
          fullWidth
          id="emailOrUsername"
          label="Email ou Pseudo"
          name="emailOrUsername"
          autoComplete="emailOrUsername"
          autoFocus
        />
        <FormTextField
        defaultValue={''}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Se connecter
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/forgot-password" component={NavLink}  variant="body2">
              Mot de passe oublié ?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" component={NavLink} variant="body2">
              Pas encore inscrit ? Je m'inscris
            </Link>
          </Grid>
        </Grid>
      </FormContainer>
    </FormProvider>
  );
}

export default SigninForm;
