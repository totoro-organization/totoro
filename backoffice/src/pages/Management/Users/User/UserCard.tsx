import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import StatusLabel from 'src/components/StatusLabel';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Text from 'src/components/Text';
import { User } from 'src/models';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card>
      <CardHeader subheader={
      <Box>
        <Typography variant="h4" gutterBottom>
          Details personnels
        </Typography>
        <Typography variant="subtitle2">
          Gérer les données de l'utilisateur
        </Typography>
      </Box>}/>
      <Divider />
      {user ? (
        <CardContent sx={{ p: 4 }}>
          <Typography variant="subtitle2">
            <Grid justifyItems={'center'} container spacing={0}>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Nom :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{user.lastname}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Prénom :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{user.firstname}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Pseudo :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{user.username}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Email :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{user.email}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Crée le :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">{user.createdAt}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Modifié le :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">{user.updatedAt}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Statut :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <StatusLabel status={user.status.label}/>
                </Box>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      ) : (
        <SuspenseLoader />
      )}
    </Card>
  );
};

export default UserCard;
