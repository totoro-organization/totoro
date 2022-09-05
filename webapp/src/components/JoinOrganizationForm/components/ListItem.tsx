import {
  // Checkbox,
  IconButton,
  ListItem,
  // ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  styled
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Loader from 'src/components/Loader';
import { useState } from 'react';
import { requestOrganization } from 'src/api/organizations/requests';
import { useToast } from 'src/hooks/useToast';
import { APP_PATHS } from 'src/appPaths';
import { Link } from 'react-router-dom';

const Container = styled(ListItem)(
  ({ theme }) => `
       padding: ${theme.spacing(2)};
`
);

function JoinOrganizationListItem({ item }) {
  const labelId = `checkbox-list-label-${item.id}`;
  const { setToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleRequestOrganization = async () => {
    setIsLoading(true);
    const response = await requestOrganization(item.id);
    if ('error' in response) {
      setIsLoading(false);
      setToast({
        variant: 'error',
        message: response.message,
        duration: 6000
      });
      return;
    }
    setIsLoading(false);
    setSuccess(true);
    setToast({
      variant: 'success',
      message:
        'Votre demande à été envoyée avec succès. Veuillez vérifier votre boite mail',
      duration: 6000
    });
  };
  return (
    <Container
      role={undefined}
      dense
      // onClick={handleToggle(index)}
      divider
    >
      {/* <ListItemIcon>
      <Checkbox
        edge="start"
        checked={checked.indexOf(index) !== -1}
        tabIndex={-1}
        disableRipple
        inputProps={{ "aria-labelledby": labelId }}
      />
    </ListItemIcon> */}
      <Link to={APP_PATHS.ORGANIZATION(item.id)}>
        <ListItemText id={labelId} primary={item.name}/>
      </Link>
      {/* <ListItemText  /> */}
      <ListItemSecondaryAction onClick={handleRequestOrganization}>
        <IconButton color="primary" edge="end" aria-label="comments">
          {/* */}
          {isLoading ? (
            <Loader size={24} />
          ) : success ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ArrowForwardIcon />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </Container>
  );
}

export default JoinOrganizationListItem;
