import {
    Card,
    CardContent,
    Grid,
    Typography
  } from '@mui/material';
  import { Box } from '@mui/system';
import { format } from 'date-fns';
  import StatusSelect from 'src/components/StatusSelect';
  import SuspenseLoader from 'src/components/SuspenseLoader';
  import Text from 'src/components/Text';
  import { Litigation, StatusEnum, TableEnum } from 'src/models';
  
  interface LitigationCardProps {
    litigation: Litigation;
  }
  
  const LitigationCard = ({ litigation }: LitigationCardProps) => {

    const statusOptions = [
      {
        id: StatusEnum.opened,
        name: 'Ouvert'
      },
      {
        id: StatusEnum.closed,
        name: 'Fermé'
      },
    ];

    return (
      <Card>
        {litigation ? (
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid justifyItems={'center'} container spacing={0}>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Motif :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Text color="black">
                    <b>{litigation.litigation_object.label}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Mission :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Text color="black">
                    <b>{litigation.mission.job.title} de {litigation.mission.job.author.organization.name}</b> 
                  </Text>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Auteur :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Text color="black">
                    <b>Remplir auteur</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Cible :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Text color="black">
                    <b>Remplir cible</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Crée le :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{format(new Date(litigation.createdAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Modifié le :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{format(new Date(litigation.updatedAt), "dd/MM/yyyy HH:mm:ss")}</Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Statut :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                  <StatusSelect table={TableEnum.litigations} currentItem={{ id: litigation.id, status: litigation.status}} statusOptions={statusOptions} />
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
  
  export default LitigationCard;
  