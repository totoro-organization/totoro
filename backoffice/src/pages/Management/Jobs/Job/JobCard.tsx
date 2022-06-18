import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import StatusSelect from 'src/components/StatusSelect';
import Text from 'src/components/Text';
import { Job, StatusEnum, TableEnum } from 'src/models';
import { config } from 'src/services/config';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
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
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid justifyItems={'center'} container spacing={0}>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Titre :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{job.title}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Association :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{job.author.organization.name}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Auteur :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {job.author.user.firstname} {job.author.user.lastname} (
                  {job.author.user.username})
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Nombre de participants :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {job.participants_max - job.remaining_place} /{' '}
                  {job.participants_max}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Adresse :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {job.address}, {job.cp} {job.commune}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Difficulté :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {job.difficulty.level} ({job.difficulty.token})
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Dates :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>Commence le : {job.start_date}</b>
                &emsp;
                <b>Termine le : {job.end_date}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Créée le :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <Text color="black">{job.createdAt}</Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Modifiée le :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <Text color="black">{job.updatedAt}</Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Statut :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <StatusSelect
                  table={TableEnum.jobs}
                  currentItem={{ id: job.id, status: job.status }}
                  statusOptions={statusOptions}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                QR Code :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <img src={config.server + job.qrcode} alt="Qr Code" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Description :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{job.description}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
