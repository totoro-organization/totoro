import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import useAuth from 'src/hooks/useAuth';

function EditProfileTab() {

  const { user } = useAuth();

  //Provisoire
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
    }
    return null;
  }

  const formatedPhoneNumber = (formatPhoneNumber(user.phone));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent>
            <Typography variant="subtitle2">
                <Box
                  p={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Typography>
                      Name:
                    </Typography>
                    <Text color="black">
                      <b>{user.firstname} {user.lastname}</b>
                    </Text>
                  </Grid>
                  <Button variant="text" startIcon={<EditTwoToneIcon />}>
                    Edit
                  </Button>
                </Box>
                <Box
                  p={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Typography>
                      Date of birth:
                    </Typography>
                    <Text color="black">
                      <b>{user.birthday}</b>
                    </Text>
                  </Grid>
                  <Button variant="text" startIcon={<EditTwoToneIcon />}>
                    Edit
                  </Button>
                </Box>
                <Box
                  p={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Typography>
                      Phone number:
                    </Typography>
                    <Text color="black">
                      <b>{ formatedPhoneNumber }</b>
                    </Text>
                  </Grid>
                  <Button variant="text" startIcon={<EditTwoToneIcon />}>
                    Edit
                  </Button>
                </Box>
                <Box
                  p={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  >
                  <Grid>
                    <Typography>
                      Address:
                    </Typography>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">
                        1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California,
                        93262
                      </Text>
                    </Box>
                  </Grid>
                  <Button variant="text" startIcon={<EditTwoToneIcon />}>
                    Edit
                  </Button>
                </Box>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your account
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Language:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Account status:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color="success">
                    <DoneTwoToneIcon fontSize="small" />
                    <b>Active</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>example@demo.com</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>demo@example.com</b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
