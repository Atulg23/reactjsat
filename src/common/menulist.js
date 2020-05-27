import React,{Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
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
import MenuItem  from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "theme.palette.background.paper",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    active: {
        backgroundColor: "theme.palette.action.selected",
        
      },
}));
const AppMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [openProject, setOpenProject] = React.useState(false)
    const [openModules, setOpenModules] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleListItemClick = (event, index) => {
        if(index === 5  ){
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
            {/* <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/"
            >
                
                <Tooltip title="DashBoard">
                <ListItem button 
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                </Tooltip>
            </NavLink> */}
            {/* <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/employee"
            >
               
                <Tooltip title="Employee">
                <ListItem button 
                 selected={selectedIndex === 1} 
                 onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee" />
                </ListItem>
                </Tooltip>
            </NavLink> */}
            {/* <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/employeead"
            >
               
                
                <Tooltip title="Employee Active Directory">
                <ListItem button 
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee AD" />
                    </ListItem>
                </Tooltip>
                   
            </NavLink>   */}
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/customer"
            >
             
                <Tooltip title="Customer">
                <ListItem button 
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customer" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/projectlist"
            >
             
                <Tooltip title="Project List">
                <ListItem button 
                selected={selectedIndex === 15}
                onClick={(event) => handleListItemClick(event, 15)}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Project" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/ra"
            >
             
                <Tooltip title="Resource Allocation">
                <ListItem button 
                selected={selectedIndex === 13}
                onClick={(event) => handleListItemClick(event, 13)}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Resource Allocation" />
                </ListItem>
                </Tooltip>
            </NavLink>

            <NavLink
                        style={{
                            color: "#000000",
                            textDecoration: "none"
                        }}
                        to="/du"
                    >
                   
                        <Tooltip title="Delivery Unit">
                        <ListItem 
                        selected={selectedIndex === 4}
                         onClick={(event) => handleListItemClick(event, 4)}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="DU" />
                        </ListItem>
                        </Tooltip>
                    </NavLink>


            {/* //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

            {/* <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/projectdashboard"
            >
              
               <Tooltip title="Project Dashboard">
                <ListItem button 
                 selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
               // onClick={handleClickProject}
                 >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Project Dashboard"/>&nbsp;&nbsp;&nbsp;&nbsp;
                    {openProject ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                </Tooltip>
            </NavLink>
            <Collapse in={openProject} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/projectdashboard/projects"
            >
              
                <Tooltip title="Projects">
                <ListItem button 
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
                className={classes.nested} >
                    <ListItemIcon>
                        <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Project" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <Divider />
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/projectdashboard/project_types"
            >
                {" "}
                <Tooltip title="Project Types">
                <ListItem button  className={classes.nested}
                selected={selectedIndex === 7}
                onClick={(event) => handleListItemClick(event, 7)}
                >
                    <ListItemIcon>
                        <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Project-Type" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <Divider />
            </List>
            </Collapse>

           
 */}

            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            {/* <ListItem button onClick={handleClick}  >
                <ListItemIcon >
                    <IconLibraryBooks />
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {open ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <NavLink
                        style={{
                            color: "#000000",
                            textDecoration: "none"
                        }}
                        to="/du"
                    >
                        {" "}
                        <ListItem className={classes.nested}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="DU" />
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink
                        style={{
                            color: "#000000",
                            textDecoration: "none"
                        }}
                        to="/dudd"
                    >
                        {" "}
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="DUDD" />
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink
                        style={{
                            color: "#000000",
                            textDecoration: "none"
                        }}
                        to="/technology"
                    >
                        {" "}
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <WbIncandescentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Technology" />
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink
                        style={{
                            color: "#000000",
                            textDecoration: "none"
                        }}
                        to="/countries"
                    >
                        {" "}
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <WidgetsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Countries" />
                        </ListItem>
                    </NavLink>
                    <Divider />
                </List>
            </Collapse> */}


            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <Tooltip title="Modules">
            <ListItem button 
            onClick={handleClickModules}
                  >
                <ListItemIcon >
                    <DehazeIcon />
                </ListItemIcon>
                <ListItemText primary="Modules" />&nbsp;&nbsp;&nbsp;&nbsp;
                {openModules ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            </Tooltip>
            <Collapse in={openModules} timeout="auto" unmountOnExit>
                
                <List component="div" disablePadding>
            <Divider />

            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/roles"
            >
                {" "}
                <Tooltip title="Roles">
                <ListItem button className={classes.nested}
                selected={selectedIndex === 8}
                onClick={(event) => handleListItemClick(event, 8)}
                 >
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Roles" />
                </ListItem>
                </Tooltip>
            </NavLink>

            <Divider />
            
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/designation"
            >
               
                <Tooltip title="Designations">
                <ListItem button className={classes.nested}
                selected={selectedIndex === 9}
                onClick={(event) => handleListItemClick(event, 9)}
                >
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Designation" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <Divider />
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/organization"
            >
               
                <Tooltip title="Organization">
                <ListItem button className={classes.nested}
                selected={selectedIndex === 10}
                onClick={(event) => handleListItemClick(event, 10)}
                >
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Organization" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <Divider />
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/domains"
            >
              
                <Tooltip title="Domains">
                <ListItem button className={classes.nested}
                selected={selectedIndex === 11}
                onClick={(event) => handleListItemClick(event, 11)}
                >
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Domain" />
                </ListItem>
                </Tooltip>
            </NavLink>
            <Divider />
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/departments"
            >
              
                <Tooltip title="Departments">
                <ListItem button className={classes.nested}
                selected={selectedIndex === 12}
                onClick={(event) => handleListItemClick(event, 12)}
                >
                    <ListItemIcon>
                        <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Departments" />
                </ListItem>
                </Tooltip>
            </NavLink>
           
                </List>
            </Collapse>

            {/* <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/Section"
            >
                {" "}
                <MenuItem button>
                    <ListItemIcon>
                        <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Section" />
                </MenuItem>
            </NavLink>
            <NavLink
                style={{
                    color: "#000000",
                    textDecoration: "none"
                }}
                to="/operation"
            >
                {" "}
                <ListItem button >
                    <ListItemIcon>
                        <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Operations" />
                </ListItem>
            </NavLink> */}
           
        </Fragment>
    )
}



export default AppMenu;
