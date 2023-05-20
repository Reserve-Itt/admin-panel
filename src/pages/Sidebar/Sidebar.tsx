import React, { FC, useState } from "react";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@material-ui/core";
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  BusinessCenter as BusinessCenterIcon,
  EventNote as EventNoteIcon,
  People as PeopleIcon,
  Build as BuildIcon,
  LocalOffer as LocalOfferIcon,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import logoImage from '../../images/whiteLogoRedBackground.jpg'; // Import the image file
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#d3272f", // Set the background color here
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(),
  },
  title: {
    flexGrow: 1,
    padding: theme.spacing(2),
    fontSize: "2rem",
    color: "red",
    fontWeight: "bold",
  },
  listItemIcon: {
    color: "white", // Set the color of the ListItemIcon to white
  },
}));

const Sidebar: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={classes.root} >
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <div className={classes.title}>
            <Stack spacing={2} alignItems={"center"}>

              {/* <Typography variant="h5" className={classes.listItemIcon}>Logo</Typography> */}

              <div style={{ maxWidth: '200px' }}>
              <img src={logoImage} alt="Logo" style={{ width: '100%', height: 'auto' }} />
              </div>

              <Typography variant="h5" className={classes.listItemIcon}>Reserve It Admin Panel</Typography>
              

            </Stack>

          </div>
          <List>
            <ListItem button onClick={() => handleNavigation("/main")}>
              <ListItemIcon className={classes.listItemIcon}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/profile")}>
              <ListItemIcon className={classes.listItemIcon}>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="About"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/addService")}>
              <ListItemIcon className={classes.listItemIcon}>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="My Services"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/reservations")}>
              <ListItemIcon className={classes.listItemIcon}>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="My Reservations"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/clients")}>
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clients"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/settings")}>
              <ListItemIcon className={classes.listItemIcon}>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Settings"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/addAdvertisement")}>
              <ListItemIcon className={classes.listItemIcon}>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Add Advertisement"
                primaryTypographyProps={{ style: { color: "white" } }} // Set the color to white
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
