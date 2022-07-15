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
import { Link } from 'react-router-dom';
import StatusSelect from 'src/components/StatusSelect';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Text from 'src/components/Text';
import { StatusEnum, TableEnum, Partner } from 'src/models';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = ({ partner }: PartnerCardProps) => {

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
      {partner ? (
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
                  <b>{partner.name}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Adresse :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{partner.address}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Site web :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                  <Link to={partner.link}>{ partner.link }</Link>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Email :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <b>{partner.email}</b>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Téléphone :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                 {partner.phone}
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Utilisateur :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Text color="black">
                  <Link to={`/gestion/utilisateurs/${partner.user.id}`}>{partner.user.firstname} {partner.user.lastname} ({partner.user.username})</Link>
                </Text>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Crée le :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">{format(new Date(partner.createdAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Modifié le :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <Text color="black">{format(new Date(partner.updatedAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  Description :
                </Box>
              </Grid>
              <Grid item xs={12} sm={10} md={10}>
                <Box pr={3} pb={2}>
                  <Text color="black">{partner.description ?? "Aucune"}</Text>
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
                  table={TableEnum.partners}
                  currentItem={{ id: partner.id, status: partner.status }}
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

export default PartnerCard;
