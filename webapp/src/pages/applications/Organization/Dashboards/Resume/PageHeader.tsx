import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { config } from 'src/api/config';
import FallbackAvatar from 'src/components/FallbackAvatar';
import { useSession } from 'src/hooks/useSession';

function PageHeader() {

  const { user, currentApp } = useSession();
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        {/* <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.firstname + ' ' + user.lastname}
          src={user.avatar}
        /> */}
        <FallbackAvatar
        sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
                    variant="rounded"
                    src={config.server + currentApp?.data.logo}
                    fallback={currentApp?.data.name}
                    alt={currentApp?.data.name}
                  />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        { currentApp?.data.name }.

        </Typography>
        <Typography variant="subtitle2">
        Bonjour, {user.firstname + ' ' + user.lastname} ! Consultez les dernières activités de votre association.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
