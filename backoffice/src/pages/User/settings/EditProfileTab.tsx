import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Switch,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import useAuth from '../../../hooks/useAuth';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useState } from 'react';
import { updateAdmin, updatePasswordAdmin } from 'src/services/admins.service';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import { Admin } from 'src/models';
import { getCurrentUser } from 'src/services/auth.service';
import { useToast } from 'src/hooks/useToast';

function EditProfileTab() {
  const [EditUser, setEditUser] = useState(false);
  const [valueEdit, setValueEdit] = useState({});
  const { user: currentUser } = useAuth();
  const [editPassword, setEditPassword] = useState(false);
  const [user, setUser] = useState<Admin>(currentUser);
  const { setToast } = useToast();

  const handleChangeEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setValueEdit({
      ...valueEdit,
      [name]: value
    });
  };

  const handleEditUser = async () => {
    const updateResponse = await updateAdmin(user.id, valueEdit);
    setToast({ 
      variant: 'error' in updateResponse ? 'error' : 'success',
      message: updateResponse.message
    })
    if ('error' in updateResponse) return;
    setEditUser(false);
    const userResponse = await getCurrentUser();
    setToast({ 
      variant: 'error' in updateResponse ? 'error' : 'success',
      message: updateResponse.message
    })
    if ('error' in userResponse) return;
    setUser(userResponse as Admin);
  };

  const handleEditUserPassword = async () => {
    const updateResponse = await updatePasswordAdmin(valueEdit);
    setToast({ 
      variant: 'error' in updateResponse ? 'error' : 'success',
      message: updateResponse.message
    })
    if ('error' in updateResponse) return;
    setEditPassword(false);
    const userResponse = await getCurrentUser();
    setToast({ 
      variant: 'error' in updateResponse ? 'error' : 'success',
      message: updateResponse.message
    })
    if ('error' in userResponse) return;
    setUser(userResponse as Admin);
  };

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
                    Depuis le:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">{user.createdAt}</Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Username:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{user.username}</Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Role:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{user.role.label}</Text>
                  </Box>
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
    </Grid>
  );
}

export default EditProfileTab;
