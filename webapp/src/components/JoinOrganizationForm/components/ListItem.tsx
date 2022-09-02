import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  styled
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Container = styled(ListItem)(
  ({ theme }) => `
       padding: ${theme.spacing(2)};
`
);

function JoinOrganizationListItem({ item }) {
  const labelId = `checkbox-list-label-${item.id}`;
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
      <ListItemText
        id={labelId}
        primary={item.name}
        // className={classes.listItemText}
      />
      <ListItemSecondaryAction>
        <IconButton color='primary' edge="end" aria-label="comments">
          <ArrowForwardIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </Container>
  );
}

export default JoinOrganizationListItem;
