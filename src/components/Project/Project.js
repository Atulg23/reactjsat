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
import AddProject from "./AddProject";
import EditProject from './EditProject';
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
  
const Project = () => 
{

  const classes = useStyles();

  const [projects,setProjects]=useState([]);
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
  console.log(projects);
  console.log(id);
  setEditInput((projects.filter(obj => obj.id === id)[0]));
  setEdit(true);
};


const addProject = obj => {
  projects.id = projects.length + 1;
    setProjects([ ...projects, obj ])
   window.location.reload();

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
      setProjects(projects.filter(projects => projects.id !== id)) 
      instance.delete(`/projects/${id}`)
        .then(res => {
            console.log(res);
         }).catch(error=>{
        console.log(error)
    })
        swal("Poof! The Record file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("The Record is safe!");
    }
  });
}

const updateProject=(data,id)=>{
 
    setProjects(projects.map(project => (project.id === id ? data : project)))
    window.location.reload();
}


  const columns = [

    {
      label:"Id",
      name: "id",
      options:{display:false,sortDirection:'asc'}
     
    },
    {
      label:"Name",
      name: "name",
     
    },
    {
      label:"Short Name",
      name: "short_name",
      
    }
    ,
    {
      label:"Code",
      name: "code",
     
    }
    ,
    {
      label:"Customer Id",
      name: "id",
     
    }
    ,
    {
      label:"Project_Type",
      name: "project_type",
     
    },
    {
      label:"Is_Internal",
      name: "is_internal",
      options:{
        display:false
      }
     
  
     
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
                    <IconButton onClick={()=>{handleClickEdit(rowId[0])}}>
                        <EditIcon color="primary" />
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


  let projectData=[]; 
  useEffect(()=>{
      console.log("Getting users");
      instance.get('/projects/')
      .then(response => {
        for(const key in response.data){
            projectData.push({
            id: response.data[key].id,
            name: response.data[key].name,
            short_name: response.data[key].short_name,
            code:response.data[key].code,
            customer_id: response.data[key].customer_id,
            project_type: response.data[key].project_type,
            is_internal:response.data[key].is_internal,
          
          })
        }
        setProjects(projectData)
      })
    
  },[])



  let datalist=[];
  projects.forEach((p) => {
          const data = [];
          data.push(p.id);
          data.push(p.name);
          data.push(p.short_name);
          data.push(p.code);
          data.push(p.id);
          data.push(p.project_type);
          data.push(p.is_internal);
          
          datalist.push(data);
    });

    return (
     <Paper className="mainContent">
           <Button variant="contained" color="primary" onClick={handleClickOpen}>
           <AddIcon/>
           </Button>
           <br></br>
           <br></br>
          <MUIDataTable
              title={"Projects List"}
              data={datalist}
              columns={columns}
              options={options}
              className={classes.root}
         />
      <AddProject  open={open} handleClose={handleClose} addProject={addProject}/>
      <EditProject edit={edit} handleClose={handleClose}  editinput={editinput}  updateProject={updateProject}/>
     </Paper>  
    )
}

export default Project;

