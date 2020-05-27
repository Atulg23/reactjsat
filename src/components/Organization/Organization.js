import React, {  useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
// import Slide from '@material-ui/core/Slide';
import MUIDataTable from "mui-datatables";
import AddOrganization from "./AddOrganization";
import EditOrganization from "./EditOrganization";
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

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="circle" ref={ref} {...props} />;
// });

const Organization = () => {

    const classes = useStyles();
    const [organization, setOrganization] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [empDetails, setEmpDetails] = React.useState(false);
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
                display:false
            }
        },
        {
            label: "Name",
            name: "name",

        },
        {
            label: "Short Name",
            name: "short_name",

        },
        {
            label: "Description",
            name: "description",

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
                           
                            <IconButton>
                                <EditIcon color="primary" onClick={()=>handleClickOpenEdit(rowId[0])} />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon color="secondary" onClick={() => { handleClickDelete(rowId[0]) }} />
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


    let organizationData = [];
    useEffect(() => {
        console.log("Getting users");
        instance.get('/organizations/')
            .then(response => {
                //console.log(response.data.employees)
                for (const key in response.data) {
                    organizationData.push({
                        
                        id: response.data[key].id,
                        name: response.data[key].name,
                        short_name: response.data[key].short_name,
                        description: response.data[key].description,
                    })
                }
                setOrganization(organizationData)
            
            })

    }, [])


    let datalist = [];
    organization.forEach((e) => {
        const data = [];
        data.push(e.id);
        data.push(e.name);
        data.push(e.short_name);
        data.push(e.description);
        datalist.push(data);
        //  console.log(datalist);
    });

    const handleClickOpenEdit = (id) => {
       
          console.log(id);
          console.log((organization.filter(data => data.id === id)));
          setView((organization.filter(data => data.id === id)[0]));

          console.log(view);
         
        setEdit(true);
        
    }

    const handleClickDelete = (id) => {
        swal({
             title: "Done!",
             text: "Record Deleted Successfully!",
             icon: "success",
             timer: 1000,
             button: false
        })
        console.log(id);
        instance.delete(`/organizations/${id}`)
        .then(res => {
        console.log(res);
        setOrganization(organization.filter(data=>data.id !== id))
         })
         .catch(error=>{console.log(error)})
    }

    const handleClickOpen = (name) => {
        setOpen(true);
    };

    

    const addInput = user => {
        organization.id = organization.length + 1
        setOrganization([...organization, user])
        console.log(user);
        window.location.reload();
    }
  

    return (

        <Paper className="mainContent">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
               <AddIcon/>
          </Button>  <br></br>  <br></br>
            <MUIDataTable
                title={"Organization List"}
                data={datalist}
                columns={columns}
                options={options}
                className={classes.root}
            />
            
            <AddOrganization open={open} handleClose={handleClose} addInput={addInput} />
            <EditOrganization edit={edit} handleClose={handleCloseEdit}   view={view}/>

        </Paper>

    )
}

export default Organization;

