import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from '@material-ui/core/Grid';
import AppMenu from './menulist';
// import RouterBreadcrumbs from './MenuItems';
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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LayersIcon from "@material-ui/icons/Layers";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import BusinessIcon from "@material-ui/icons/Business";
import DehazeIcon from '@material-ui/icons/Dehaze';
import WidgetsIcon from '@material-ui/icons/Widgets';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse'

const drawerWidth = 250;
const drawerHeight = 750;


const useStyles = makeStyles((theme) => ({
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


const LinkRouter = (props) => <Link {...props} component={RouterLink} />;


const DrawerHeader = ({ open, handleDrawerClose, handleDrawerOpen }) => {
    const classes = useStyles(0);
    const [openProject, setOpenProject] = React.useState(false)
    const [openModules, setOpenModules] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleListItemClick = (event, index) => {
        if (index === 5) {
            handleClickProject()
        }

        setSelectedIndex(index);
    };
    // function handleClick() {
    //     setOpen(!open)    
    // }

    function handleClickProject() {

        setOpenProject(!openProject)
    }
    function handleClickModules() {
        setOpenModules(!openModules)
    }

    return (
        <Fragment>
            <MemoryRouter initialEntries={['/']} initialIndex={0} >
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
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                PMO
                             </Typography>

                            <Route className={classes.title}>
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

                    <Divider />
                    <AppMenu />
                </Drawer>
            </MemoryRouter>
        </Fragment>
    );
};

export default DrawerHeader;

