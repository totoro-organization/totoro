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
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { config } from 'src/services/config'

function MenuAppList() {

  const [openOrganizations, setOpenOrganizations] = useState(false);
  const [openPartners, setOpenPartners] = useState(false);
  const { user } = useAuth();

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
      <img src={config.server + user.memberships[0].organization.logo} alt="organization logo" />
        <ListItemText primary={user.memberships[0].organization.name} />
        {openOrganizations ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOrganizations} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
           
            {
                user.memberships.map(membership => (
                    <Box key={membership.organization.id}>
                        <img src={config.server + membership.organization.logo} alt="organization logo" />
                        <ListItemText primary={`${membership.organization.name}`} />
                    </Box>
                ))
            }
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickPartners}>
        { user.partners.length ? (
            <>
                <img src={config.server + user.partners[0].logo} alt="partner logo" />
                <ListItemText primary={user.partners[0]} />
            </> 
        ) : <p>Ajouter un partenaire</p> }
        
        {openPartners ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPartners} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            {
               user.partners.length ? user.partners.map(partner => (
                    <Box key={partner.id}>
                        <img src={config.server + partner.logo} alt="partner logo" />
                        <ListItemText primary={`${partner.name}`} />
                    </Box>
                )) : <p>Ajouter un partenaire</p>
            }
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default MenuAppList;
