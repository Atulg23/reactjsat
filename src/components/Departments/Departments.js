import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import swal from 'sweetalert';
import AddDepartments from "./AddDepartments";
import EditDepartments from './EditDepartments';
import AddIcon from '@material-ui/icons/Add';

const useStyles = () =>
  makeStyles({
    root: {
      width: "500%",
      
    },
    container: {
      maxHeight: 440,
    },
   
  });
  
const Departments = () => 
{

  const classes = useStyles();

  const [departments,setDepartments]=useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editinput, setEditInput] = useState([]);


  function handleClose() {
    setOpen(false);
    setEdit(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
};
const handleClickEdit = (id) => {
  console.log(departments);
  console.log(id);
  setEditInput((departments.filter(obj => obj.id === id)[0]));
  setEdit(true);
};


const addDepartments = obj => {
  window.location.reload();
  setDepartments([ ...departments, obj ])
//   swal({
//     title: "Done!",
//     text: "projects element deleted..",
//     icon: "success",
//     timer: 3000,
//     button: false
//   })
}


const deleteHandler=(id)=>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, You will not be able to recover Record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      setDepartments(departments.filter(c => c.id !== id))
      instance.delete(`/departments/${id}`)
      .then(res => {
      console.log(res);
    })
    .catch(error=>{console.log(error)})
      swal("Poof! The Record file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("The Record is safe!");
    }
  });
 
 }

const updatedDepartments=(data,id)=>{
  window.location.reload();
  setDepartments(departments.map(c => (c.id === id ? data : c)))
}


  const columns = [

    {
      label:"Id",
      name: "id", 
      options:{
        display:false,
      sortDirection: 'asc'
      }  
    },
    {
      label:"Name",
      name: "name",
     
    }
    ,
    {
      label:"Description",
      name: "description",
     
    },
    {
      label:"Actions",
      options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              const rowId = tableMeta.rowData;
              return (
                <div>   
                    <IconButton onClick={()=>{deleteHandler(rowId[0])}}>
                        <DeleteIcon color="secondary" />
                    </IconButton>
                    <IconButton  onClick={()=>{handleClickEdit(rowId[0])}}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </div>
                    )
              }       
    },
  }
  ];

  const options = {
    selectableRows:false,
    filterType: "dropdown",
    responsive: "scroll",
    download:true,
    print:true,
  };


  let departmentsData=[]; 
  useEffect(()=>{
      console.log("Getting Departments");
      instance.get('/departments/')
      .then(response => {
        for(const key in response.data){
            departmentsData.push({
            id: response.data[key].id,
            name: response.data[key].name,
            description: response.data[key].description
          })
        }
        setDepartments(departmentsData)
      })
  },[])


  let datalist=[];
  departments.forEach((c) => {
          const data = [];
          data.push(c.id);
          data.push(c.name);
          data.push(c.description);
          datalist.push(data);
    });

    return (
     <Paper className="mainContent">
           <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <AddIcon/>
           </Button>
           <br></br><br></br>
          <MUIDataTable
              title={"Departments List"}
              data={datalist}
              columns={columns}
              options={options}
              className={classes.root}
         />
       <AddDepartments  open={open} handleClose={handleClose} addDepartments={addDepartments}/> 
       <EditDepartments edit={edit} handleClose={handleClose}  editinput={editinput}  updatedDepartments={updatedDepartments}/> 
     </Paper>  
    )
}

export default Departments;

