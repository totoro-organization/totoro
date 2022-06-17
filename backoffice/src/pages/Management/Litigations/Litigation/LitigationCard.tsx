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
  import { Litigation } from 'src/models';
  
  interface LitigationCardProps {
    litigation: Litigation;
  }
  
  const LitigationCard = ({ litigation }: LitigationCardProps) => {
    return (
      <Card>
        <CardHeader subheader={
        <Box>
          <Typography variant="h4" gutterBottom>
            Details du litige
          </Typography>
          <Typography variant="subtitle2">
            Le : {litigation.createdAt}
          </Typography>
        </Box>}/>
        <Divider />
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
                    <Text color="black">{litigation.createdAt}</Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Modifié le :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{litigation.updatedAt}</Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={2} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Statut :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <StatusLabel status={litigation.status.label}/>
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
  