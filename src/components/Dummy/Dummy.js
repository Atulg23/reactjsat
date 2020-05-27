import React, { Fragment } from "react";
import Header from "../../common/Header";
import DrawerComp from "../../common/DrawerComp";
import clsx from "clsx";
import MainComponentStyle from "./MainComponentStyle";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from "@material-ui/core/IconButton";

import { Link as RouterLink } from 'react-router-dom';
import Routes from '../Routes/index'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { Route, MemoryRouter } from 'react-router';

const breadcrumbNameMap = {
  '/employee': 'Employee',
  '/employeead': 'Employee AD',
  '/customer': 'Customer',
  '/du': 'DU',
  '/projectdashboard': 'Project DashBoard',
  '/projectdashboard/projects': 'Project',
  '/projectdashboard/project_types': 'Project Type',
  '/modules': 'Modules',
  '/modules/roles': 'Role',
  '/modules/domains': 'Domain',
  '/modules/departments': 'Departments',
  '/modules/designation': 'Designation',
  '/modules/organization': 'Organization',
  
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: 360,
//   },
//   lists: {
//     backgroundColor: theme.palette.background.paper,
//     marginTop: theme.spacing(1),
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;



const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  list: {
    marginTop:"65px", 
    width: 250,
  },
  fullList: {
   
    width: 'auto',
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "block",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
  
    background:"linear-gradient(160deg,#da303e,#e23341,#eb3644,#f43947,#e94c51,#ca6460,#a8736f,#7f7f7f)",
   height:"67px",
  // color:"rgb(0,0,0)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({ handleDrawerOpen, open }) => {
  const classes = useStyles(0);
 
  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
        
        PMO   
          </Typography>
         {/* <MemoryRouter>
         <Route className='mainContent'>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  DashBoard
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
         </MemoryRouter> */}
         
        </Toolbar>
      </AppBar>
      
    </div>
  );
};










const Dummy = () => {
  const classes = MainComponentStyle(0);
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <DrawerComp open={open} handleDrawerClose={handleDrawerClose} />
        <Routes/>
      </div>
    </Fragment>
  );
};

export default Dummy;
