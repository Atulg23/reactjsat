import React, { useState,useEffect,Fragment } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import swal from 'sweetalert';
import AddCountries from "./AddCountries";
import EditCountries from './EditCountries';


const useStyles = () =>
  makeStyles({
    root: {
      width: "100%",
      
    },
    container: {
      maxHeight: 440,
    },
   
  });
  
const Countries = () => 
{

  const classes = useStyles();

  const [countries,setCountries]=useState([]);
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
  console.log(countries);
  console.log(id);
  setEditInput((countries.filter(obj => obj.id == id)[0]));
  setEdit(true);
};


const addCountries = obj => {
  window.location.reload();
  setCountries([ ...countries, obj ])
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
      setCountries(countries.filter(c => c.id !== id)) 
      instance.delete(`/countries/${id}`)
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

const updateCountries=(data,id)=>{
  window.location.reload();
  setCountries(countries.map(c => (c.id === id ? data : c)))
}


  const columns = [

    {
      label:"Id",
      name: "id",  
      options:{
        filter:false,
        sortDirection:'asc'
      } 
    },
    {
      label:"Country Name",
      name: "name",
     
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
                    <IconButton>
                        <DeleteIcon color="secondary" onClick={()=>{deleteHandler(rowId[0])}}/>
                    </IconButton>
                    <IconButton>
                        <EditIcon color="primary" onClick={()=>{handleClickEdit(rowId[0])}}/>
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


  let countriesData=[]; 
  useEffect(()=>{
      console.log("Getting countries");
      instance.get('/countries/')
      .then(response => {
        for(const key in response.data){
            countriesData.push({
            id: response.data[key].id,
            name: response.data[key].name
          })
        }
        setCountries(countriesData)
      })
  },[])


  let datalist=[];
  countries.forEach((c) => {
          const data = [];
          data.push(c.id);
          data.push(c.name);
          datalist.push(data);
    });

    return (
     
      <div className="mainContent">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
           Add Countries
           </Button>
           <br></br>
           <br></br>
           <br></br>

      
     <Paper >
           
          <MUIDataTable
              title={"Countries"}
              data={datalist}
              columns={columns}
              options={options}
              className={classes.root}
         />
      <AddCountries  open={open} handleClose={handleClose} addCountries={addCountries}/> 
     <EditCountries edit={edit} handleClose={handleClose}  editinput={editinput}  updateCountries={updateCountries}/>
     </Paper>  
     </div>

    )
}

export default Countries;

