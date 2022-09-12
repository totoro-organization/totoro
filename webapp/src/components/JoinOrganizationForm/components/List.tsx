import { List, ListSubheader } from '@mui/material';
import React, { Fragment } from 'react';
import JoinOrganizationListItem from './ListItem';

function JoinOrganizationList({ organizations }) {
  return (
    <List
      // className={classes.listRoot}
    >
      {organizations.map((item) => (
        <Fragment key={item.id}>
            <JoinOrganizationListItem item={item} />
        </Fragment>
      ))}
    </List>
  );
}

export default JoinOrganizationList;
