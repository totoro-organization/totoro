import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Text from 'src/components/Text';
import { Organization } from 'src/models';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid justifyItems={'center'} container spacing={1}>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Nom :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{organization.name}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Activité :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{organization.activity}</b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Site web :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
               { organization.link ? <Link to={organization.link}>{organization.link}</Link> : "Aucun"}
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Adresse :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box display={"flex"} flexDirection="column">
                <Text color="black">
                  {organization.address}
                </Text>
                <Text color="black">
                    {organization.commune}, {organization.cp}
                </Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                N°SIREN :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {organization.siren}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                N°SIRET :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {organization.siret}
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Email :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>
                  {organization.email ?? 'Aucun'} 
                </b>
              </Text>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Téléphone :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
               {organization.phone}
              </Text>
            </Grid>
            {/* <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Nombre de membres :
              </Box>
            </Grid> */}
            {/* <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
               {organization.users.length}
              </Text>
            </Grid> */}
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Créée le :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <Text color="black">{format(new Date(organization.createdAt), "dd/MM/yyyy HH:mm:ss")}</Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Modifiée le :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                <Text color="black">{format(new Date(organization.updatedAt), "dd/MM/yyyy HH:mm:ss")}</Text>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={3} textAlign={{ sm: 'right' }}>
              <Box pr={3} pb={2}>
                Description :
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} md={9}>
              <Text color="black">
                <b>{organization.description ?? "Aucune"}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
