import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useSession from 'src/hooks/useSession';
import { config } from 'src/services/config';

function PageHeader() {

  const { user } = useSession();
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.firstname + ' ' + user.lastname}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenue, {user.firstname + ' ' + user.lastname} !
        </Typography>
        <Typography variant="subtitle2">
          Consultez les activités récentes des applications Totoro.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
