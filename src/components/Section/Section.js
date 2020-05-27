import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import Slide from '@material-ui/core/Slide';
import MUIDataTable from "mui-datatables";
import AddSection from "./AddSection";
import EditSection from "./EditSection";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from 'sweetalert';

const useStyles = () =>
    makeStyles({
        root: {
            width: "500%",

        },
        container: {
            maxHeight: 440,
        },

    });

const Section = () => {

    const classes = useStyles();
    const [section, setSection] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [roleDetails , setroleDetails] = React.useState(false);
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
                sortDirection: 'asc'
            }
        },
        {
            label: "Title",
            name: "section_title",

        },
        {
            label: "Description ",
            name: "section_description",

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


    let sectionData = [];
    useEffect(() => {
        console.log("Getting users");
        instance.get('/Sections/')
            .then(response => {
                //console.log(response.data.sections)
                for (const key in response.data) {
                    sectionData.push({
                        id: response.data[key].id,                      
                        section_title: response.data[key].section_title,
                        section_description: response.data[key].section_description,
                    })

                }
                setSection(sectionData)
                
            })

    }, []) 

    let datalist = [];
    section.forEach((e) => {
        const data = [];
        data.push(e.id);
        data.push(e.section_title);
        data.push(e.section_description);
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
          console.log((section.filter(data => data.id === id)));
          setView((section.filter(data => data.id === id)[0]));

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
                setSection(section.filter(data=>data.id!==id))
                instance.delete(`/Sections/${id}`)
                .then(res => {
                console.log(res);
                setSection(section.filter(data=>data.id!==id))
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
        section.id = section.length + 1;
        console.log(section.id)
        setSection([...section, user])
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
                Add Section
          </Button>  <br></br>  <br></br>
            <MUIDataTable
                title={"Section List"}
                data={datalist}
                columns={columns}
                options={options}
                className={classes.root}
            />
            
            <AddSection open={open} handleClose={handleClose} addInput={addInput} />
            <EditSection edit={edit} handleClose={handleCloseEdit} editInput={editInput}  view={view}/>

        </Paper>

    )
}

export default Section;

