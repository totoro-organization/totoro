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
import { SignupSchema } from '../../components/SignupForm/Signup.schema';
import { format } from 'date-fns';
import { SignUpData } from 'src/models';
import Copyright from 'src/components/Copyright';
import SignupForm from 'src/components/SignupForm';

const theme = createTheme();



export default function SignUp() {
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
          <SignupForm/>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
