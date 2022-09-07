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
import { useSession } from 'src/hooks/useSession';
import { LoadingButton } from '@mui/lab';

const Container = styled(ListItem)(
  ({ theme }) => `
       padding: ${theme.spacing(2)};
`
);

function JoinOrganizationListItem({ item }) {
  const labelId = `checkbox-list-label-${item.id}`;
  const { user } = useSession();
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
  const isUserInOrganization = user.memberships.find(
    (membership) => membership.organization.id === item.id
  );

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
        <ListItemText id={labelId} primary={item.name} />
      </Link>
      {/* <ListItemText  /> */}
      <ListItemSecondaryAction>
        {isUserInOrganization ? (
          <p> Vous faites partie de cette association</p>
        ) : success ? (
          <CheckCircleIcon color="success" />
        ) : (
          <LoadingButton
            onClick={handleRequestOrganization}
            loading={isLoading}
            loadingPosition="start"
            variant="outlined"
            startIcon={<ArrowForwardIcon />}
          >
            Rejoindre
          </LoadingButton>
        )}
      </ListItemSecondaryAction>
    </Container>
  );
}

export default JoinOrganizationListItem;
