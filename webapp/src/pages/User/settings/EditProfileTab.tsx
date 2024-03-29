import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import formatPhoneNumber from 'src/utils/formatPhoneNumber';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useState } from 'react';
import { updateUser, updatePasswordUser } from 'src/api/users/requests';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import { useSession } from 'src/hooks/useSession';

function EditProfileTab() {
  const [EditUser, setEditUser] = useState(false);
  const [valueEdit, setValueEdit] = useState({});
  const { user, getConnectedUser } = useSession();
  const [editPassword, setEditPassword] = useState(false);

  const handleChangeEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setValueEdit({
      ...valueEdit,
      [name]: value
    });
  };

  const handleEditUser = async () => {
    const updateResponse = await updateUser(user.id, valueEdit);
    if ('error' in updateResponse) return;
    setEditUser(false);
    getConnectedUser();
  };

  const handleEditUserPassword = async () => {
    const updateResponse = await updatePasswordUser(valueEdit);
    if ('error' in updateResponse) return;
    setEditPassword(false);
    getConnectedUser();
  };

  const formatedPhoneNumber = formatPhoneNumber(String(user.phone));

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
            <>
              {!EditUser ? (
                <Button
                  variant="text"
                  startIcon={<EditTwoToneIcon />}
                  onClick={() => {
                    setEditUser(true);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <div>
                  <Button
                    variant="text"
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={handleEditUser}
                  >
                    validé
                  </Button>

                  <Button
                    variant="text"
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setEditUser(false);
                    }}
                  >
                    annuler
                  </Button>
                </div>
              )}
            </>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid justifyItems={'center'} container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Firstname:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <b>{user.firstname}</b>
                    ) : (
                      <TextField
                        id="user-firstname"
                        label="Firstname"
                        name="firstname"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Lastname:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <b>{user.lastname}</b>
                    ) : (
                      <TextField
                        id="user-lastname"
                        label="Lastname"
                        name="lastname"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <b>{user.email}</b>
                    ) : (
                      <TextField
                        type="email"
                        id="user-email"
                        label="Email"
                        name="email"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Birthday:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <b>{user.birthday}</b>
                    ) : (
                      <TextField
                        id="birdthday"
                        label="Birthday"
                        name="birthday"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Phone number:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <b>{formatedPhoneNumber}</b>
                    ) : (
                      <TextField
                        id="phone-number"
                        label="Phone number"
                        name="phonenumber"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    {!EditUser ? (
                      <Text color="black">
                        1749 High Meadow Lane, SEQUOIA NATIONAL PARK,
                        California, 93262
                      </Text>
                    ) : (
                      <TextField
                        id="address"
                        label="Adress"
                        name="adress"
                        onChange={(e: any) => {
                          handleChangeEdit(e);
                        }}
                        variant="standard"
                        size="small"
                      />
                    )}
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              {!editPassword ? (
                <Button
                  onClick={() => setEditPassword(true)}
                  size="large"
                  variant="outlined"
                >
                  Change password
                </Button>
              ) : (
                <div>
                  <Button
                    variant="text"
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={handleEditUserPassword}
                  >
                    validé{' '}
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setEditPassword(false);
                    }}
                  >
                    annuler
                  </Button>
                </div>
              )}
            </ListItem>
            {editPassword && (
              <>
                <Divider />
                <ListItem sx={{ p: 3 }}>
                  <TextField
                    label="Old password"
                    type="password"
                    id="user-old-password"
                    name="old_password"
                    onChange={(e: any) => {
                      handleChangeEdit(e);
                    }}
                    variant="standard"
                    size="small"
                  />
                </ListItem>
                <ListItem sx={{ p: 3 }}>
                  <TextField
                    label="New password"
                    type="password"
                    id="user-password"
                    name="password"
                    onChange={(e: any) => {
                      handleChangeEdit(e);
                    }}
                    variant="standard"
                    size="small"
                  />
                </ListItem>
              </>
            )}
          </List>
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
    </Grid>
  );
}

export default EditProfileTab;
