import { Box, Container, CssBaseline, Grid } from '@mui/material';
import AuthLogo from 'src/components/AuthLogo';
import Copyright from 'src/components/Copyright';
import SigninForm from 'src/components/SigninForm';
import Paper from '@mui/material/Paper';
import { DefaultSettingsT, ItemCarrousel } from 'src/shared/interfaces';
import CarrouselItems from 'src/components/CarrouselItems';
import 'src/style/common.scss';


const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 8
};

const items: ItemCarrousel[] = [
  {
      name: "Lear Music Reader",
      description: "A PDF Reader specially designed for musicians. A PDF Reader specially designed for musicians. A PDF Reader specially designed for musicians.",
  },
  {
      name: "Hash Code 2019",
      description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
  },
  {
      name: "Terrio",
      description: "A exciting mobile game game made in the Unity Engine.",
  },
  {
      name: "React Carousel",
      description: "A Generic carousel UI component for React using material ui.",
  }
]

export default function SignIn() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?associations)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          className='hide-mobile'
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <CarrouselItems items={items} settings={DefaultSettingsT} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container sx={containerStyles} component="main" maxWidth="xs">
            <AuthLogo />
            <SigninForm />
            <Copyright />
          </Container>
        </Box>
      </Grid>
    </Grid>

  );
}
