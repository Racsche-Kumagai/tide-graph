import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(4)
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  toolbar: {
    height: "7.5vh"
  }
}));

export default function HamburgerMenu() {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [state, setState] = React.useState({
    left: false,
    right: false
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">地域一覧</Typography>
        </Toolbar>
        <Divider />
        <Divider />
        {["Inbox", "Starred", "Send email", "Drafts"].map(region => (
          <ExpansionPanel classes={{ root: classes.paper }} key={region}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={region}
              id={region}
            >
              <Typography>{region}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List onClick={toggleDrawer("left", false)}>
                {["Inbox", "Starred", "Send email", "Drafts"].map(city => (
                  <ListItem button key={city}>
                    <ListItemText primary={city} />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </SwipeableDrawer>
    </div>
  );
}