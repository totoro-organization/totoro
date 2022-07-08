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
import getFormatLocalDate from 'src/utils/getFormatLocalDate';
import ParticipantItem from './ParticipantItem';
  
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
        </Box>}/>
        <Divider />
        {user ? (
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid justifyItems={'center'} container spacing={0}>
                <ParticipantItem title='Nom :'>
                  <Text color="black">
                    <b>{user.lastname}</b>
                  </Text>
                </ParticipantItem>
                <ParticipantItem title='Prénom :'>
                  <Text color="black">
                    <b>{user.firstname}</b>
                  </Text>
                </ParticipantItem>
                <ParticipantItem title='Pseudo :'>
                  <Text color="black">
                    <b>{user.username}</b>
                  </Text>
                </ParticipantItem>
                <ParticipantItem title='Email :'>
                  <Text color="black">
                    <b>{user.email}</b>
                  </Text>
                </ParticipantItem>
                <ParticipantItem title='Crée le :'>
                  <Text color="black">{getFormatLocalDate(user.createdAt)}</Text>
                </ParticipantItem>
                <ParticipantItem title='Modifié le :'>
                  <Text color="black">{getFormatLocalDate(user.updatedAt)}</Text>
                </ParticipantItem>
                <ParticipantItem title='Statut '>
                  <StatusLabel status={user.status.label}/>
                </ParticipantItem>
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
  