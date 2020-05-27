import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
// import Header from "../../common/Header";
// import DrawerComp from "../../common/DrawerComp";
// import DrawerHeader from "../../common/Drawer_Header";
import Routes from "../../Routes/";
// import MainComponentStyle from "./MainComponentStyle";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from '@material-ui/core/Grid';
import AppMenu from '../../common/menulist';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const drawerWidth = 250;
const drawerHeight = 750;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

  },
  //Drawer Styles

  drawerPaper: {
    // backgroundColor:"rgb(127,127,127)", 
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: drawerHeight,
    border: "0",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    overflowY: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },

  //Header Styles
  list: {
    marginTop: "65px",
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

    background: "linear-gradient(160deg,#da303e,#e23341,#eb3644,#f43947,#e94c51,#ca6460,#a8736f,#7f7f7f)",
    height: "67px",
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

const breadcrumbNameMap = {
  '/employee': 'Employee',
  '/employeead': 'Employee AD',
  '/customer': 'Customer',
  '/addcustomer': 'Add Customer',
  '/editcustomer': 'Edit Customer',
  '/projectlist': 'Project',
  '/addproject': 'Add Project',
  '/editproject': 'Edit Project',
  '/ra': 'Resource Allocation',
  'radetails':'RA Details',
  '/du': 'DU',
  '/projectdashboard': 'Project DashBoard',
  '/projectdashboard/projects': 'Project',
  '/projectdashboard/project_types': 'Project Type',
  '/roles': 'Role',
  '/domains': 'Domain',
  '/departments': 'Departments',
  '/designation': 'Designation',
  '/organization': 'Organization',

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


const LinkRouter = (props) => <Link {...props} component={RouterLink} />;


//Separator for BreadCrumbs Path
const Separator = ({ children, ...props }) => (
  <span style={{ color: 'rgb(0,0,0)',fontSize:"small",marginTop:"6px"}} {...props}>
    <b>{children}</b>
  </span>
)


const MainComponent = (props) => {
  console.log(props);
  
  const classes = useStyles(0);
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const l1 =()=>{
    props.L1()
  }
  return (
    <Fragment>
      <div className={classes.root}>
      <CssBaseline />
       
     
          <div className={classes.root} >
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
                
                <div style={{ width: "430px" }} >
                  <Route >
                    {({ location }) => {
                      const pathnames = location.pathname.split('/').filter((x) => x);

                      return (
                        <Breadcrumbs aria-label="breadcrumb"  separator={<Separator><ArrowForwardIosIcon style={{fontSize:"medium"}}/></Separator>} >
                          <LinkRouter  to="/" color="inherit"   >
                            <strong>Home</strong>
                          </LinkRouter>
                          {pathnames.map((value, index) => {
                            const last = index === pathnames.length - 1;
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                            return last ? (
                              <Typography key={to} color="inherit" >
                               <strong> {breadcrumbNameMap[to]}</strong>
                              </Typography>
                            ) : (
                                <LinkRouter  to={to} key={to} color="inherit" >
                                 <strong>{breadcrumbNameMap[to]}</strong> 
                                </LinkRouter>
                              );
                          })}
                        </Breadcrumbs>
                      );
                    }}
                  </Route>
                </div>
                {/* <div style={{ marginLeft: "50px" }}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    <h2>PMO</h2>
                  </Typography>
                </div> */}
                <div style={{ marginLeft: "60%", }}>
                 
                    <AccountCircleIcon style={{fontSize:"50", padding:"0", marginTop:"4px"}} />
                 
                </div>
                {/* <button onClick={()=>l1()}>Logout</button> */}
              </Toolbar>
            </AppBar>
          </div>
          
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
            open={open}
          >
            <div  >
              <Grid style={{
                // background:"linear-gradient(160deg,#da303e,#d04347,#c55150,#ba5d59,#ad6762,#a0706c,#917875,#7f7f7f)",
                backgroundColor: "rgb(218,48,62)"
              }} container>
                <Grid item xs={12} sm={4}>
                  <Button onClick={handleDrawerClose} style={{ marginTop: "0px", height: "67px" }}>
                    <ChevronLeftIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <img src="../../../nitor_logo1.png" width="100" />
                </Grid>

              </Grid>

            </div>

            <Divider/>
            <AppMenu/>
            
          </Drawer>
          
            
          <Routes/>
          
          
       
      </div>
    </Fragment>
  );
};

export default MainComponent;
