import React, { Fragment, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import instance from '../../common/instance';
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MUIDataTable from "mui-datatables";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core";
import AddDesignation from './AddDesignation';
import EditDesignation from './EditDesignation';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(() => ({

  textField: {
    width: "95%",
    
  },

  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },

}));




const Designation = () => {
  const classes = useStyles();
  const [designation, setDesignation] = useState([]);
  const [open, setOpen] = React.useState(false);
  //const [desgDetails, setDesgDetails] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [users, setUsers] = useState([]);

    function handleClose() {
        setOpen(false);
       // setEdit(false);
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
            label: "Status",
            name: "is_active",
            options:{
                display:false
            }

        },

        {
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                //  onCellClick: (rowIndex) => {this.handleEdit(rowIndex)},
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;
                    //console.log(rowId[0])
                    return (
        
                        <div >
                            {/* <VisibilityIcon color="secondary" /> */}
                            <IconButton onClick={()=>handleClickOpenEdit(rowId[0])}>
                            <EditIcon color="primary"   />
                            </IconButton>
                            <IconButton onClick={() => { handleClickDelete(rowId[0])}} >
                                <DeleteIcon color="secondary"  />
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
        selectableRows: false,
        //onRowClick: employee => handleClickOpen(employee[0]),
    };


    let designationData = [];
    useEffect(() => {
        console.log("Getting Designations");
        instance.get('/designations/')
            .then(response => {
                console.log(response.data)
                for (const key in response.data) {
                  designationData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        short_name: response.data[key].short_name,
                        description: response.data[key].description,
                      is_active: response.data[key].is_active
                    })
                    // console.log(response.data[key].id);
                }
                setDesignation(designationData)
                //console.log(designationData);
            })
    }, [])


    const [view, setView] = useState([])
    let datalist = [];
    designation.forEach((e) => {
        const data = [];
        data.push(e.id);
        data.push(e.name);
        data.push(e.short_name);
        data.push(e.description);
      //  data.push(e.is_active)
        datalist.push(data);
        //console.log(datalist);
    });
    const handleClickOpenEdit = (id) => {
     //  alert("hello")
      //  setEdit(true);
        //console.log(name);
      //  setView(designation.filter(data => data.name == name))
console.log(id);
      console.log((designation.filter(data => data.id === id)));
      setView((designation.filter(data => data.id === id)[0]));

      console.log(view);
     
    setEdit(true);
    }

    const handleClickOpen = (name) => {
        setOpen(true);
          //  console.log(name)
          //  setView(Designation.filter(data=>data.name===name))
    };

    const handleClickDelete = (id) => {
        console.log(id);
        instance.delete(`/designations/${id}`)
        .then(res => {
        console.log(res);
        setDesignation(designation.filter(data=>data.id != id))
         })
         .catch(error=>{console.log(error)})
    }

    const addInput = user => {
        user.id = users.length + 1
        setUsers([...users, user]);
        window.location.reload();
        console.log(user);
      }

      const editInput = (user,id) => {
        console.log(user);
        //setTimeout({addInput},200);
    }

  return (
    
<Paper className="mainContent" >
         <Button variant="contained" color="primary" onClick={handleClickOpen}><AddIcon/></Button>  
     <br></br>
     <br></br>
     
     <MUIDataTable
        title={"Designation List"}
        data={datalist}
        columns={columns}
        options={options}
        className={classes.root}
      />
           <AddDesignation open={open} addInput={addInput} handleClose={handleClose}/> 
           <EditDesignation edit={edit} handleClose={handleCloseEdit} editInput={editInput}  view={view}/>

        </Paper>
     
     
    
  );

};

export default Designation;
