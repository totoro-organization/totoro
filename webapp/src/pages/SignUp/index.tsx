import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSession } from 'src/hooks/useSession';
import { FormProvider, useForm } from 'react-hook-form';
import { FormContainer, FormDatePicker, FormTextField } from 'src/components/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from './Signup.schema';
import { format } from 'date-fns';
import { SignUpData } from 'src/models';
import Copyright from 'src/components/Copyright';

const theme = createTheme();

interface SignupFieldTypes {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  username: string,
  birthday: Date
}

export default function SignUp() {
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <FormProvider {...methods}>
            <FormContainer
              onSubmit={methods.handleSubmit(onSubmit)}
            >
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
                  <FormDatePicker label="Date de naissance" name="birthday" />
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
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
