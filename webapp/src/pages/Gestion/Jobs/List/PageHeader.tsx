import { Typography } from '@mui/material';


function PageHeader() {

  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        Création de votre mission
      </Typography>
      <Typography variant="subtitle2">
        Remplissez ce formulaire pour ajouter votre mission.
      </Typography>
    </>
  );
}

export default PageHeader;