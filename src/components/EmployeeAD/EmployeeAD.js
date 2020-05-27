import React, { Fragment, useState, useEffect, forwardRef } from "react";
import {Grid,Box } from "@material-ui/core/";
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";
import EditAdEmployee from './EditEmployeeAD';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Checkbox from '@material-ui/core/Checkbox'
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import  swal  from 'sweetalert';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: '400px',
        overflow: "auto",
      
      }
      
      
    }
  }
});


const EmployeeAD = () => {
 
  const columns = [

    {
      label:"Id",
      name: "id",
      options: {
        filter: false,
        display: false,
        sortDirection: 'asc',
        fontWeight: "bold"
      }

    },
    {
      label: "Employee Name",
      name: "display_name",
      options: {
        filter: false,
        fontWeight: "bold"
        //customBodyRender: (value) => (<div style={{whiteSpace:'pre'}}><b>{value}</b></div>)
      }
    },
    {
      label: "Email Id",
      name: "email",
      options: {
        filter: false,

      }
    },
    {
      label: "Public ID",
      name: "public_id",
      options: {
        filter: false,
        display: false
      }

    },
    {
      label: "Employee_ID",
      name: "employee_id",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "First Name",
      name: "first_name",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Middle Name",
      name: "middle_name",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Last Name",
      name: "last_name",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Date of Birth",
      name: "dob",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Gender",
      name: "gender",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Joining Date",
      name: "joining_date",
      options: {
        filter: false,
        display: false
      }
    },


    {
      label: "Created By ",
      name: " created_by",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Updated By",
      name: "updated_by",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Deleted By",
      name: "deleted_by",
      options: {
        filter: false,
        display: false
      }
    },
    {
      label: "Validity",
      name: "is_valid_user",
      options: {
        
      //   display: false
             customBodyRender: (value, tableMeta, updateValue) => {
                const rowId = tableMeta.rowData;
          //      console.log(rowId[14]);
          //      console.log(rowId);
        // console.log(value)
        
                      //   if(rowId[14] === true){
                      //   return (
                      //         <p style={{color:"green"}}><b>Valid</b></p>
                      //   //<Checkbox name="is_on_boarded" checked={rowId.value} onCheck={(e, checked) => rowId.onChange(checked)}label="isBoarded" defaultChecked={true}/> 
                      //   )
                      // }
                      // else
                      // return(
                      //   <p style={{color:"red"}}><b>InValid</b></p>
                      //     // <Checkbox name="is_on_boarded" label="isBoarded"  defaultChecked={false}/> 
                      // )
                      if (value === true)
                      return (
                          <IconButton onClick={() => doInValid(rowId[0])}>
                            <Tooltip title="Valid User">
                              <Done color="primary"  />
                            </Tooltip>
                          </IconButton>
                      );
                    else
                      return (
                        <IconButton onClick={() => doValid(rowId[0])}>
                          <Tooltip title="InValid User">
                            <Close color="error" />
                          </Tooltip>
                        </IconButton>
                      );
                      }
    }
    },
    {
      label: "Actions",
      options: {
        overflowX: '100%',
        filter: false,
        sort: false,
        empty: true,
        // onRowClick:(rowData) => {console.log(rowData)},
        // onCellClick: (rowIndex) => {this.handleEdit(rowIndex)},
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowId = tableMeta.rowData;
          //console.log(rowId[0])
          return (
            <div>
            <IconButton onClick={() => handleClickOpen(rowId[0])}>
              <Tooltip title="View Details" >
                <VisibilityIcon color="secondary"/>
              </Tooltip>
            </IconButton>
              
              
              <IconButton  onClick={() => handleClickOpenEdit(rowId[0])}>
                <Tooltip title="On Board">
                  <AssignmentTurnedInIcon color="primary" />
                </Tooltip>
              </IconButton>
              {/* <IconButton >
                      <DeleteIcon color="secondary"/>
                  </IconButton> */}

            </div>

          )
        }

      }
    },
    {
      label: "",
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
      }
    }



  ];


  const options = {
    selectableRows: false,   //checkbox
    filterType: "dropdown",  //filter on columns
    responsive: "scroll",    //scrollbar
    download: true,
    print: false,
   
    //onRowClick: (rowMeta) => {console.log(rowMeta)},

  };
  const [employee, setEmployees] = useState([]);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState([])
  const [viewEdit, setViewEdit] = useState([])
  const[status,setStatus]=useState(false);
  

  let ademployeeData = [];
  const [date, setDate] = useState();
  useEffect(() => {
    console.log("Getting users");
    instance.get('/ademployees/')
      .then(response => {
       console.log(response.data)
        for (const key in response.data) {
          ademployeeData.push({
            id: response.data[key].id,
            display_name: response.data[key].display_name,
            email: response.data[key].email,
            public_id: response.data[key].public_id,
            created_by: response.data[key].created_by,
            updated_by: response.data[key].updated_by,
            deleted_by: response.data[key].deleted_by,
            is_valid_user: response.data[key].is_valid_user,
            is_on_boarding: response.data[key].is_on_boarding,
            employee_id: response.data[key].employee_id,
            first_name: response.data[key].first_name,
            middle_name: response.data[key].middle_name,
            last_name: response.data[key].last_name,
            created_on: response.data[key].created_on,
            updated_on: response.data[key].updated_on,
            is_active: response.data[key].is_active,
          })

        }
       //setEmployees(ademployeeData)
       
     
          setEmployees(ademployeeData.filter(data => data.is_on_boarding === false && data.is_valid_user === true));
  
      })

  }, [])


  //console.log(employee);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  // console.log(employee)
  let datalist = [];
  employee.forEach((a) => {
    const data = [];
    data.push(a.id);
    data.push(a.display_name);
    data.push(a.email);
    data.push(a.public_id);
    data.push(a.employee_id);
    data.push(a.first_name);
    data.push(a.middle_name);
    data.push(a.last_name);
    data.push(a.created_on);
    data.push(a.updated_on);
    data.push(a.created_by);
    data.push(a.updated_by);
    data.push(a.deleted_by);
    data.push(a.is_active);
    data.push(a.is_valid_user);
    data.push(a.is_on_boarding);
    datalist.push(data);

  }

  );


const doValid = (id) => {
 // e.preventDefault()
 let data={  
  is_valid_user:true    
  }

 swal({
  title: "Are You Sure?",
  text: "Think Again Before Validating Employee!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})

.then((willValidate) => {
  if (willValidate) {
    
    // console.log(data)
    instance.put(`/ademployees/${id}`,data)
    .then(res => {
        console.log(res);
console.log(data)
        
         })
         .catch(error=>{console.log(error)})
      swal("The Employee Validating Successfully!", {
      icon: "success",
      buttons: false,
    });
    addEmployee(data,id)
  } else {
    swal("Validating Cancelled!",{
      icon: "error",
      buttons:false,
      timer:2000
    });

  }
 
});
}


const doInValid = (id) => {
  // e.preventDefault()
  let data={  
   is_valid_user:false    
   }
 
  swal({
   title: "Are You Sure?",
   text: "Think Again Before In-Validating Employee !",
   icon: "warning",
   buttons: true,
   dangerMode: true,
 })

 .then((willInValidate) => {
   if (willInValidate) {
     
     // console.log(data)
     instance.put(`/ademployees/${id}`,data)
     .then(res => {
         console.log(res);
         console.log(data)
          })
          .catch(error=>{console.log(error)})
       swal("The Employee In-Validating Successfully!", {
       icon: "success",
       buttons: false,
     });
     addEmployee(data,id)
   } else {
     swal("In-Validating Cancelled!",{
       icon: "error",
       buttons:false,
       timer:2000
     });
 
   }
  
 });

}
 
            



  const handleClickOpen = (id) => {
    setOpen(true);
    console.log(id)

    setView(employee.filter(data => data.id === id))

  };
  const handleClickOpenEdit = (id) => {
    
    //console.log(id);
    //console.log((employee.filter(data => data.id === id)[0]));
    setViewEdit((employee.filter(data => data.id === id)[0]));
    //console.log(view);
    setEdit(true);
    

  }

  let modifiedDate;
  const getDate = () => {
    // setStatus(true);
    if (localStorage.getItem('time')) {
      //  let fixedDateFormat = modifiedDate.toString().slice(0,25);
      modifiedDate = localStorage.getItem('time');
      setDate(modifiedDate.toString().slice(0, 25))
      modifiedDate = new Date();
      localStorage.setItem("time", modifiedDate);
      console.log(modifiedDate);
      setEmployees(ademployeeData.filter(data => data.is_on_boarding === false && data.is_valid_user === true));
      
    }
    else {
      modifiedDate = document.lastModified;
      //let fixedDateFormat = modifiedDate.toString().slice(0,25);
      setDate(modifiedDate)
      localStorage.setItem("time", modifiedDate);
      modifiedDate = localStorage.getItem("time");
      //  console.log(modifiedDate);
    }
    //console.log("Getting users");
    instance.get('/ademployees/')
      .then(response => {
        for (const key in response.data) {
          ademployeeData.push({
            id: response.data[key].id,
            display_name: response.data[key].display_name,
            email: response.data[key].email,
            public_id: response.data[key].public_id,
            created_by: response.data[key].created_by,
            updated_by: response.data[key].updated_by,
            deleted_by: response.data[key].deleted_by,
            is_valid_user: response.data[key].is_valid_user,
            is_on_boarding: response.data[key].is_on_boarding,
            employee_id: response.data[key].employee_id,
            first_name: response.data[key].first_name,
            middle_name: response.data[key].middle_name,
            last_name: response.data[key].last_name,
            is_active: response.data[key].is_active,
            created_on: response.data[key].created_on,
            updated_on: response.data[key].updated_on
          })

        }
        setEmployees(ademployeeData.filter(data => data.is_on_boarding === false&& data.is_valid_user === true))
      
      })
     
  }
  const addEmployee = user => {
    window.location.reload();
   // console.log(user);

 
}


const isValid=(event)=>{
 //event.preventDefault();
  //console.log(status);
  //console.log(event)
  if(status === true){
  //  setStatus(true);
    console.log(status);
    instance.get('/ademployees/')
    .then(response => {
      for (const key in response.data) {
        ademployeeData.push({
          id: response.data[key].id,
          display_name: response.data[key].display_name,
          email: response.data[key].email,
          public_id: response.data[key].public_id,
          created_by: response.data[key].created_by,
          updated_by: response.data[key].updated_by,
          deleted_by: response.data[key].deleted_by,
          is_valid_user: response.data[key].is_valid_user,
          is_on_boarding: response.data[key].is_on_boarding,
          employee_id: response.data[key].employee_id,
          first_name: response.data[key].first_name,
          middle_name: response.data[key].middle_name,
          last_name: response.data[key].last_name,
          is_active: response.data[key].is_active,
          created_on: response.data[key].created_on,
          updated_on: response.data[key].updated_on
        })

      }
      setEmployees(ademployeeData.filter(data => data.is_valid_user === true && data.is_on_boarding === false  ));
    })
  
    setStatus(false);
  }
  else{
  // setStatus(false)
   console.log(status);
    instance.get('/ademployees/')
    .then(response => {
      for (const key in response.data) {
        ademployeeData.push({
          id: response.data[key].id,
          display_name: response.data[key].display_name,
          email: response.data[key].email,
          public_id: response.data[key].public_id,
          created_by: response.data[key].created_by,
          updated_by: response.data[key].updated_by,
          deleted_by: response.data[key].deleted_by,
          is_valid_user: response.data[key].is_valid_user,
          is_on_boarding: response.data[key].is_on_boarding,
          employee_id: response.data[key].employee_id,
          first_name: response.data[key].first_name,
          middle_name: response.data[key].middle_name,
          last_name: response.data[key].last_name,
          is_active: response.data[key].is_active,
          created_on: response.data[key].created_on,
          updated_on: response.data[key].updated_on
        })

      }
      setEmployees(ademployeeData.filter(data => data.is_on_boarding === false ))
    })
    setStatus(true);
  }
  

}





  return (
    <Fragment>
      <div className="mainContent">
     
        <div >
          <Button variant="contained" id="sync" color="primary" onClick={getDate}>Sync</Button>
          <b style={{ marginLeft: "300px" }}>Last Sync : </b>{date}

        </div>
        <br></br>
        <Box style={{backgroundColor:"skyblue", width:"20%"}}>
        <div>
          <Checkbox  defaultChecked={true} onClick={(event)=>isValid(event)}/> <b>Valid Users</b>
        </div>
        </Box>
        
        <br></br>
        <MuiThemeProvider>
         <Paper><h2 ><b style={{ fontSize: "25px", marginLeft:"400px"}}>Ad Employee List</b></h2>
          <MUIDataTable
            title={""}
            data={datalist}
            columns={columns}
            options={options}
          />
          </Paper>
        </MuiThemeProvider>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth>
          <DialogTitle id="alert-dialog-slide-title">{"AD_Employee Details"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {view.map(e => (
                <Grid>
                  <Grid><h2><b>{e.display_name}</b></h2></Grid>
                  <Grid><h5><b><font size="4">Email</font></b></h5>{e.email}</Grid>
                  <Grid><h5> <b><font size="4">Public Id</font></b></h5>{e.public_id}</Grid>
                  <Grid><h5><b><font size="4">Employee Id</font></b></h5>{e.employee_id}</Grid>
                  <Grid><h5><b><font size="4">First Name</font></b></h5>{e.first_name}</Grid>
                  <Grid><h5><b><font size="4">Middle Name</font></b></h5>{e.middle_name}</Grid>
                  <Grid><h5><b><font size="4">Last Name</font></b></h5>{e.last_name}</Grid>
                  <Grid><h5><b><font size="4">Created on</font></b></h5>{e.created_on}</Grid>
                  <Grid><h5><b><font size="4">Updated on</font></b></h5>{e.updated_on}</Grid>
                  <Grid><h5><b><font size="4">IsActive</font></b></h5>{e.is_active ? "True" : "False"}</Grid>
                  <Grid><h5><b><font size="4">Updated by</font></b></h5>{e.updated_by}</Grid>
                  <Grid><h5><b><font size="4">Created by</font></b></h5>{e.created_by}</Grid>
                  <Grid><h5><b><font size="4">Updated by</font></b></h5>{e.updated_by}</Grid>
                  <Grid><h5><b><font size="4">Deleted by</font></b></h5>{e.deleted_by}</Grid>
                  <Grid><h5><b><font size="4">Valid User</font></b></h5>{e.is_valid_user ? "True" : "False"}</Grid>
                  <Grid><h5><b><font size="4">onBoarding Status</font></b></h5>{e.is_on_boarding ? "True" : "False"}</Grid>
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
        <EditAdEmployee edit={edit} handleClose={handleClose} viewEdit={viewEdit}  addEmployee={addEmployee}/>
        </div>
    </Fragment>

  )
}

export default EmployeeAD;
