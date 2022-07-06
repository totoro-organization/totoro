import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import FallbackAvatar from 'src/components/FallbackAvatar';
import { useSession } from 'src/hooks/useSession';
import { config } from 'src/services/config';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StorefrontIcon from '@mui/icons-material/Storefront';

function MenuAppList() {
  const [openOrganizations, setOpenOrganizations] = useState(false);
  const [openPartners, setOpenPartners] = useState(false);
  const { user, currentApp, handleCurrentApp } = useSession();

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
        <ListSubheader component="h3" id="nested-list-subheader">
          APPLICATIONS
        </ListSubheader>
      }
    >
      <Divider />
      <h4> Associations</h4>
      <ListItemButton onClick={handleClickOrganizations}>
        <ListItemIcon>
          <FallbackAvatar
            variant="rounded"
            src={config.server + currentApp.data.logo}
            fallback={
              currentApp.type === 'organization' ? currentApp.data.name : null
            }
            fallbackIcon={<VolunteerActivismIcon />}
            alt="Organization name"
          ></FallbackAvatar>
        </ListItemIcon>
        <Box display="flex" flexDirection="column">
          {currentApp.type === 'organization' ? (
            <>
              <ListItemText primary={currentApp.data.name} />
              <ListItemText secondary={currentApp.role.label} />
            </>
          ) : (
            <ListItemText primary="Sélectionner" />
          )}
        </Box>
        {openOrganizations ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOrganizations} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {user.memberships.length ? (
            user.memberships.map((membership) => 
             (
              membership.id !== currentApp.member_id && <ListItemButton
                onClick={() =>
                  handleCurrentApp({
                    type: 'organization',
                    data: membership.organization,
                    member_id: membership.id,
                    role: membership.role
                  })
                }
                sx={{ pl: 4 }}
                key={membership.organization.id}
              >
                <ListItemIcon>
                  <FallbackAvatar
                    variant="rounded"
                    src={config.server + membership.organization.logo}
                    fallback={membership.organization.name}
                    alt="Organization name"
                  />
                </ListItemIcon>

                <Box
                  display="flex"
                  flexDirection="column"
                  key={membership.organization.id}
                >
                  <ListItemText primary={membership.organization.name} />
                  <ListItemText secondary={membership.role.label} />
                </Box>
              </ListItemButton>
            ))
          ) : (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Ajouter" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Rejoindre" />
              </ListItemButton>
            </>
          )}
        </List>
      </Collapse>
      <Divider />
      <h4>Partenaires</h4>
      <ListItemButton onClick={handleClickPartners}>
        <>
          <ListItemIcon>
            <FallbackAvatar
              variant="rounded"
              src={config.server + currentApp.data.logo}
              fallback={currentApp.type === 'partner' ? currentApp.data.name : null}
              fallbackIcon={<StorefrontIcon />}
              alt="Partner name"
            >
            </FallbackAvatar>
          </ListItemIcon>
          {currentApp.type === 'partner' ? (
            <ListItemText primary={currentApp.data.name} />
          ) : (
            <ListItemText primary="Sélectionner" />
          )}
        </>

        {openPartners ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPartners} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {user.partners.length ? (
            user.partners.map((partner) => (
              (currentApp.data.id !== partner.id) && <ListItemButton
                onClick={() =>
                  handleCurrentApp({ type: 'partner', data: partner })
                }
                sx={{ pl: 4 }}
                key={partner.id}
              >
                <ListItemIcon>
                  <FallbackAvatar
                    variant="rounded"
                    src={config.server + partner.logo}
                    fallback={partner.name}
                    alt="Partner name"
                  />
                </ListItemIcon>

                <ListItemText primary={partner.name} />
              </ListItemButton>
            ))
          ) : (
            <p>Ajouter un partenaire</p>
          )}
        </List>
      </Collapse>
    </List>
  );
}

export default MenuAppList;
