import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import format from 'date-fns/format';
import StatusSelect from 'src/components/StatusSelect';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Text from 'src/components/Text';
import { StatusEnum, TableEnum, User } from 'src/models';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {

  const statusOptions = [
    {
      id: StatusEnum.coming,
      name: 'A venir'
    },
    {
      id: StatusEnum.actived,
      name: 'Actif'
    },
    {
      id: StatusEnum.disabled,
      name: 'Inactif'
    },
    {
      id: StatusEnum.deleted,
      name: 'Supprimé'
    }
  ];

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
                  <Text color="black">{format(new Date(user.createdAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Modifié le :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">{format(new Date(user.updatedAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Statut :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <StatusSelect
                  table={TableEnum.users}
                  currentItem={{ id: user.id, status: user.status }}
                  statusOptions={statusOptions}
                />
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
