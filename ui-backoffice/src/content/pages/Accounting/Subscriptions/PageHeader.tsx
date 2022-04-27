import { Typography } from '@mui/material';

function PageHeader() {
  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Abonnements des utilisateurs
      </Typography>
      <Typography variant="subtitle2">
        {0} {' '}
        abonnements au total.
      </Typography>
    </>
  );
}

export default PageHeader;
