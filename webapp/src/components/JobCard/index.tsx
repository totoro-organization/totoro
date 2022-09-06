import { Card, CardContent, Grid, Typography } from '@mui/material';
import { config } from 'src/api/config';
import { Job } from 'src/models';
import JobItem from 'src/pages/applications/Organization/Management/Jobs/subComponents/JobItem';
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
import Text from '../Text';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <img
        style={{ objectFit: 'cover', width: '100%', maxHeight: '40vh' }}
        src={config.server + job.attachments[0].image}
        alt="Job"
      />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid justifyItems={'center'} container spacing={0}>
            <JobItem title="Titre :">
              <Text color="black">
                <b>{job.title}</b>
              </Text>
            </JobItem>
            <JobItem title="Association :">
              <Text color="black">
                <b>{job.author.organization.name}</b>
              </Text>
            </JobItem>
            <JobItem title="Description :">
              <Text color="black">
                <b>{job.description}</b>
              </Text>
            </JobItem>
            <JobItem title="Auteur :">
              <Text color="black">
                <b>
                  {job.author.user.firstname} {job.author.user.lastname} (
                  {job.author.user.username})
                </b>
              </Text>
            </JobItem>
            <JobItem title="Nombre de participants :">
              <Text color="black">
                <b>
                  {job.participants_max - job.remaining_place} /{' '}
                  {job.participants_max}
                </b>
              </Text>
            </JobItem>
            <JobItem title="Adresse :">
              <Text color="black">
                <b>
                  {job.address}, {job.cp} {job.commune}
                </b>
              </Text>
            </JobItem>
            <JobItem title="Difficulté :">
              <Text color="black">
                <b>
                  {job.difficulty.level} ({job.difficulty.token})
                </b>
              </Text>
            </JobItem>
            <JobItem title="Dates :">
              <Text color="black">
                <b>Commence le : {getFormatLocalDate(job.start_date)}</b>
                &emsp;
                <b>Termine le : {getFormatLocalDate(job.end_date)}</b>
              </Text>
            </JobItem>
            <JobItem title="Créée le :">
              <Text color="black">{getFormatLocalDate(job.createdAt)}</Text>
            </JobItem>
            <JobItem title="Modifiée le :">
              <Text color="black">{getFormatLocalDate(job.updatedAt)}</Text>
            </JobItem>
            <JobItem title="QR code :">
              <img src={config.server + job.qrcode} alt="Qr Code" />
            </JobItem>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default JobCard;
