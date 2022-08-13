import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  Grid,
  CardMedia,
  Button,
  Divider,
  IconButton,
  CardContent,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Text from 'src/components/Text';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { getConnectedUser } from 'src/api/auth';
import { updateUser } from 'src/api/users.service';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);


const ProfileCover = ({ user }) => {

  const [EditUserBio, setEditUserBio] = useState(false);
  const [valueEdit, setValueEdit] = useState({});

  const handleChangeEditBio = (event: React.FormEvent<HTMLFormElement>) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setValueEdit({
      ...valueEdit,
      [name]: value
    });
  };

  const handleEditUserBio = async () => {
    const updateResponse = await updateUser(user.id, valueEdit);
    if ('error' in updateResponse) return;
    setEditUserBio(false);
    getConnectedUser()
  };

  const userFullname = user.firstname + " " + user.lastname;

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {userFullname}
          </Typography>
          <Typography variant="subtitle2">
            This is a profile page. Easy to modify, always blazing fast
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={user.coverImg} />
      </CardCover>
      <Box display="flex">
        <AvatarWrapper>
          <Avatar variant="rounded" alt={userFullname} src={user.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Typography gutterBottom variant="h4" sx={{ m: 2 }}>
          {userFullname}
        </Typography>
      </Box>
      <Box py={2} pl={2} mb={3}>
        <Card sx={{ mt: 3 }}>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box style={{ width: "100%"}}>
              <Typography variant="h4" gutterBottom mb={2}>
                About
              </Typography>
              <Box 
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                {!EditUserBio ? (
                  <Typography variant="subtitle2">{user.bio}</Typography>
                ) : (
                  <TextField
                      style={{ width: "100%"}}
                      id="user-bio"
                      label="Bio"
                      name="bio"
                      multiline
                      rows={4}
                      variant="filled"
                      placeholder={user.bio}
                      onChange={(e: any) => {
                        handleChangeEditBio(e);
                      }}
                    />
                  )}
                  {!EditUserBio ? (
                  <Button
                    variant="text"
                    startIcon={<EditTwoToneIcon />}
                    onClick={() => {
                      setEditUserBio(true);
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box pl={4} >
                    <Button
                      variant="text"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={handleEditUserBio}
                    >
                      validé
                    </Button>

                    <Button
                      variant="text"
                      startIcon={<CancelIcon />}
                      onClick={() => {
                        setEditUserBio(false);
                      }}
                    >
                      annuler
                    </Button>
                  </Box>
                  )}
                </Box>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid pb={2} md={12} xs={12} display="flex">
                  <Box pr={3}>
                    <EmailIcon />
                  </Box>
                  <Text color="black">
                    {user.email}
                  </Text>
                </Grid>
                <Grid pb={2} md={12} xs={12} display="flex">
                  <Box pr={3}>
                    <CakeIcon />
                  </Box>
                  <Text color="black">
                    {user.birthday}
                  </Text>
                </Grid>
                <Grid pb={2} md={12} xs={12} display="flex">
                  <Box pr={3}>
                    <LocationOnIcon />
                  </Box>
                  <Text color="black">
                    1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California, 93262
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
