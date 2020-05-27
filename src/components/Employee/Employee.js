import React, { Fragment,useState,useEffect,forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import instance from '../../common/instance'
import Slide from '@material-ui/core/Slide';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";
import SyncIcon from '@material-ui/icons/Sync';
import { TextField } from "material-ui";


  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });


  const myTheme = createMuiTheme({
   });

  
const Employee = () => {
 
  
  
  const columns = [
    {
      label:"Id",
      name: "id",
      options: {
        display:false,
        sortDirection:'asc'
    }
    },
    {
      label:"Employee_ID",
      name: "employee_id",
      options: {
        
    }
    },
  
    {
      label:"Name",
      name: "display_name",
     
    },
    {
      label:"Email Id",
      name: "email_id",
      
    },
    {
      label:"Date of Birth",
      name: "dob",
      options: {
        display:false
    }
    },
    {
      label:"First Name",
      name: "first_name",
      options: {
        display:false
    }
    },{
      label:"Middle Name",
      name: "middle_name",
      options: {
        display:false
    }
    },{
      label:"Last Name",
      name: "last_name",
      options: {
        display:false
    }
    },
    {
      label:"Gender",
      name: "gender",
      options: {
        display:false
    }
    },
   
    {
      label:"Actions",
      options: {
           
            filter: false,
            sort: false,
            empty: true,
           // onRowClick:(rowData) => {console.log(rowData)},
          //  onCellClick: (rowIndex) => {this.handleEdit(rowIndex)},
            customBodyRender: (value, tableMeta, updateValue) => {
              const rowId = tableMeta.rowData;
             
              //console.log(rowId[0])
              return (
                <div>
                 <IconButton onClick={() => handleClickOpen(rowId[0])}>
                      <VisibilityIcon  color="primary" />
                  </IconButton>
                 <IconButton >
                      <EditIcon style={{ color: 'green' }}  />
                  </IconButton>
                  {/* <IconButton >
                      <DeleteIcon color="secondary"/>
                  </IconButton> */}
                 
                </div>
                
              )
              }
           
    },  
  },
  {
    label:"",
    name: "",
 
  },
  ];


  const options = {
    selectableRows: false,   //checkbox
    filterType: "dropdown",  //filter on columns
    //responsive: "scroll",    //scrollbar
    download:true,
    print:true,
  // onRowClick: (rowMeta) => {console.log(rowMeta)},
  
  };

  const [employee,setEmployees]=useState([]);
  let employeeData=[]; 
  useEffect(()=>{
      console.log("Getting users");
      instance.get('/employees/')
      .then(response => {
        //console.log(response.data.employees)
        for(const key in response.data){
          employeeData.push({
            id: response.data[key].id,
            display_name: response.data[key].display_name,
            email_id:response.data[key].email_id ,
            gender: response.data[key].gender,
            dob: response.data[key].dob,
            is_active: response.data[key].is_active,
            created_on:response.data[key].created_on,
            joining_date:response.data[key].joining_date ,
            updated_on:response.data[key].updated_on ,
            last_working_day:response.data[key].last_working_day,
            deleted_on: response.data[key].deleted_on,
            first_name: response.data[key].first_name,
            resigned:response.data[key].resigned ,
            photo_path: response.data[key].photo_path,
            last_name:response.data[key].last_name ,
            employee_id:response.data[key].employee_id ,
            middle_name: response.data[key].middle_name,
            on_boarded_by:response.data[key].on_boarded_by ,
            on_boarded_on: response.data[key].on_boarded_on
          })
       
        }
        setEmployees(employeeData)
        console.log(employeeData)
      })
    
  },[])

  
  const [open, setOpen] = useState(false);
  const [ view,setView]=useState([]) 
  const[date,setDate]=useState();
  const handleClose = () => {
     setOpen(false);
 };


  let datalist=[];
    employee.forEach((e) => {
          const data = [];
          data.push(e.id);
          data.push(e.employee_id);
          data.push(e.display_name);
          data.push(e.email_id);
          data.push(e.dob);
          data.push(e.first_name);
          data.push(e.middle_name);
          data.push(e.last_name);
          data.push(e.gender);

          datalist.push(data);
          //console.log(datalist);
    });
   
    const handleClickOpen = (id) => {
        setOpen(true);
        //console.log(id)
    //console.log(employee)
        setView(employee.filter(data=>data.id === id))
    
  };
  
    return (
     <Fragment  >
          <div className="mainContent"  >
          <MuiThemeProvider >
              <MUIDataTable
                title={"Employee List"}
                data={datalist}
                columns={columns}
                options={options}
              />
          </MuiThemeProvider>
          
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth>
            <DialogTitle id="alert-dialog-slide-title">{"Employee Details"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                      {view.map(e=>(
                      <Grid>
                        <Grid><h2><b>{e.display_name}</b></h2></Grid>
                        <Grid><h5>Email</h5>{e.email_id}</Grid>
                        <Grid><h5>Gender</h5>{e.gender}</Grid>
                        <Grid><h5>Date of Birth</h5>{e.dob}</Grid>
                        <Grid><h5>Is Active</h5>{e.is_active ?"True":"False"}</Grid>
                        <Grid><h5>Created on</h5>{e.created_on}</Grid>
                        <Grid><h5>Joining Date</h5>{e.joining_date}</Grid>
                        <Grid><h5>Updated on</h5>{e.updated_on}</Grid>
                        <Grid><h5>Last Working Day</h5>{e.last_working_day}</Grid>
                        <Grid><h5>Deleted on</h5>{e.deleted_on}</Grid>
                        <Grid><h5>First Name</h5>{e.first_name}</Grid>
                        <Grid><h5>Resigned</h5>{e.resigned}</Grid>
                        <Grid><h5>Photo</h5>{e.photo_path}</Grid>
                        <Grid><h5>Last Name</h5>{e.last_name}</Grid>
                        <Grid><h5>Employee Id</h5>{e.employee_id}</Grid>
                        <Grid><h5>Middle Name</h5>{e.middle_name}</Grid>
                        <Grid><h5>Boarded By</h5>{e.on_boarded_by}</Grid>
                        <Grid><h5>Boarded on</h5>{e.on_boarded_on}</Grid>
                      </Grid>
                    
                      ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
          </DialogActions>
      </Dialog>
      </div>
     </Fragment>
     
    )
}
 
export default Employee;
