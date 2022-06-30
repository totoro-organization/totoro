import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import FallbackAvatar from 'src/components/FallbackAvatar';
import useAuth from 'src/hooks/useAuth';
import { config } from 'src/services/config';

function MenuAppList() {
  const [openOrganizations, setOpenOrganizations] = useState(false);
  const [openPartners, setOpenPartners] = useState(false);
  const { user, currentApp } = useAuth();

  const handleClickOrganizations = () => {
    setOpenOrganizations(!openOrganizations);
  };

  const handleClickPartners = () => {
    setOpenPartners(!openPartners);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          APPLICATIONS
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClickOrganizations}>
        <ListItemIcon>
          <FallbackAvatar
            variant="rounded"
            src={config.server + currentApp.data.logo}
            fallback={currentApp.data.name}
            alt="Organization name"
          />
        </ListItemIcon>
        <Box display="flex" flexDirection="column">
          <ListItemText primary={currentApp.data.name} />
          <ListItemText secondary={currentApp.role.label} />
        </Box> 
        {openOrganizations ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOrganizations} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {user.memberships.map((membership) => ( 
              <>
              <ListItemIcon>
                 <FallbackAvatar
                  variant="rounded"
                  src={config.server + membership.organization.logo}
                  fallback={membership.organization.name}
                  alt="Organization name"
                />
              </ListItemIcon>
             
              <Box display="flex" flexDirection="column" key={membership.organization.id}>
               
                <ListItemText primary={membership.organization.name} />
                <ListItemText secondary={membership.role.label} />
              </Box></>
            ))}
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickPartners}>
        {user.partners.length ? (
          <>
          <ListItemIcon>
            <FallbackAvatar
              variant="rounded"
              src={config.server + currentApp.data.logo}
              fallback={currentApp.data.name}
              alt="Partner name"
            />
          </ListItemIcon>
            
            <ListItemText primary={currentApp.data.name} />
          </>
        ) : (
          <p>Ajouter un partenaire</p>
        )}

        {openPartners ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPartners} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {user.partners.length ? (
              user.partners.map((partner) => (
                <React.Fragment key={partner.id}>
                  <ListItemIcon>
                    <FallbackAvatar
                    variant="rounded"
                    src={config.server + partner.logo}
                    fallback={partner.name}
                    alt="Partner name"
                  />
                  </ListItemIcon>
                  
                  <ListItemText primary={partner.name} />
                </React.Fragment>
              ))
            ) : (
              <p>Ajouter un partenaire</p>
            )}
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default MenuAppList;
