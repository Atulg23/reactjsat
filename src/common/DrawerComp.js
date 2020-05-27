import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Grid from '@material-ui/core/Grid';
import AppMenu from './menulist';



const drawerWidth = 250;
const drawerHeight = 750;


const useStyles = makeStyles((theme) => ({
  //Drawer Styles

  drawerPaper: {
   // backgroundColor:"rgb(127,127,127)", 
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height:drawerHeight,
    border:"0",
   
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    overflowY:"hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }, 
  
  
}));


const DrawerComp = ({ open, handleDrawerClose, }) => {
  const classes = useStyles(0);


  return (
    
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
          backgroundColor:"rgb(218,48,62)"
          }} container>
        <Grid item xs={12} sm={4}>
        <Button onClick={handleDrawerClose}  style={{marginTop:"0px",height:"67px"}}>
          <ChevronLeftIcon fontSize="large"/>
         
        </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
        <img  src="../../../nitor_logo1.png" width="100"/>
        </Grid>
       
        </Grid>
       
      
      
        
       
      </div>
      
      <Divider />
      <AppMenu/>
  
    </Drawer>
  );
};

export default DrawerComp;
