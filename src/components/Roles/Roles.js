import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import MUIDataTable from "mui-datatables";
import AddRole from "./AddRoles";
import EditRole from "./EditRoles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from 'sweetalert';
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

const Roles = () => {

    const classes = useStyles();
    const [role, setRole] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [edit, setEdit] = React.useState(false);
   
    const [view, setView] = React.useState([]);

    function handleClose() {
        setOpen(false);
      
    }
    function handleCloseEdit() {
        
        setEdit(false);
    }
  
    const columns = [

        {
            label: "Id",
            name: "id",
            options:{
                display:false,
                sortDirection: 'asc',
                filter: false
            }
        },
        {
            label: "Title",
            name: "role_title",

        },
        {
            label: "Description ",
            name: "role_description",

        },
        {
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
              
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;

                   
                    return (

                        <div>
                            <IconButton onClick={()=>handleClickOpenEdit(rowId[0])}>
                                <EditIcon color="primary"  />
                            </IconButton>
                            <IconButton  onClick={() => { handleClickDelete(rowId[0]) }}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                            </div>
                    )
                }
            },
        }
    ];

    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        download: true,
        print: true,
        selectableRows:false
        
    };


    let rolesData = [];
    useEffect(() => {
        console.log("Getting roles");
        instance.get('/roles/')
            .then(response => {
                //console.log(response.data.sections)
                for (const key in response.data) {
                    rolesData.push({
                        id: response.data[key].id,                      
                        role_title: response.data[key].role_title,
                        role_description: response.data[key].role_description,
                    })

                }
                setRole(rolesData)
                
            })

    }, []) 

    let datalist = [];
    role.forEach((e) => {
        const data = [];
        data.push(e.id);
        data.push(e.role_title);
        data.push(e.role_description);
        datalist.push(data);
        //  console.log(datalist);
    });

    // const handleClickOpenRoleDetails = (name) => {
    //     setroleDetails(true);
    //     console.log(name);
    //     setView(role.filter(data => data.name === name))
    // }
    
    const handleClickOpenEdit = (id) => {
       
          console.log(id);
          console.log((role.filter(data => data.id === id)));
          setView((role.filter(data => data.id === id)[0]));

          console.log(view);
         
        setEdit(true);
        
    }

    const handleClickDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, You will not be able to recover Record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                setRole(role.filter(data=>data.id!==id))
                instance.delete(`/Sections/${id}`)
                .then(res => {
                console.log(res);
                setRole(role.filter(data=>data.id!==id))
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

    const handleClickOpen = (name) => {
        setOpen(true);
    };

    

    const addInput = user => {
        role.id = role.length + 1;
        console.log(role.id)
        setRole([...role, user])
       // console.log(user);
        window.location.reload();
    }
    const editInput = (user,id) => {
        console.log(user);
        setTimeout({addInput},200);
    }

    return (

        <Paper className="mainContent">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              <AddIcon/>
          </Button>  <br></br>  <br></br>
            <MUIDataTable
                title={"Roles List"}
                data={datalist}
                columns={columns}
                options={options}
                className={classes.root}
            />
            
            <AddRole open={open} handleClose={handleClose} addInput={addInput} />
            <EditRole edit={edit} handleClose={handleCloseEdit} editInput={editInput}  view={view}/>

        </Paper>

    )
}

export default Roles;

