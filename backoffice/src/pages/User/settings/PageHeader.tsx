import { Typography } from '@mui/material';

function PageHeader() {
  const user =
  {
    name: 'admin',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Paramètre utilisateurs
      </Typography>
      <Typography variant="subtitle2">
        {user.name},{' '}
        this could be your user settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;
