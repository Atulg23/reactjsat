import React, { Fragment,useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddOperations from "./AddOperations";
// import EditOperations from "./EditOperations";
import swal from 'sweetalert';
import EditOperation from "./EditOperation";
import AddIcon from '@material-ui/icons/Add';


const useStyles = () =>
  makeStyles({
    root: {
      width: "100%",
      
    },
    container: {
      maxHeight: 440,
    },
   
  });
  
const Operations = () => 
{

  const classes = useStyles();
  //const initialInputs = { operation_title:"", is_active: "",operation_description: "",operation_id:"", section_id: ""}
  const [operations,setOperations]=useState([]);
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
  // console.log(operations);
  // console.log(operation_id);
  setEditInput((operations.filter(obj => obj.id === id)[0]));
  setEdit(true);
};


const AddOperation = obj => {
  operations.id = operations.length + 1;
  setOperations([ ...operations, obj ])
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
        setOperations(operations.filter(operations => operations.id !== id)) 
  
        console.log(id);
        instance.delete(`/operation/${id}`)
        .then(res => {
          console.log(res);
          swal({
            title: "Done!",
            text: "Operation element deleted..",
            icon: "success",
            timer: 3000,
            button: false
        })
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




const updateOperation=(data,id)=>{
  window.location.reload();
  setOperations(operations.map(operation => (operation.id === id ? data : operation)))
}


  const columns = [

    {
      label:"Id",
      name: "id",
      options:{
        display:false,
        sortDirection:'asc',
        filter:false
      }
     
    },
    {
      label:"Section Id",
      name: "section_id",
     
    },
    {
      label:"Title",
      name: "operation_title",
      
    }
    ,
    {
      label:"Description",
      name: "operation_description",
      options: {
        filter: false,
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


  let operationsData=[]; 
  useEffect(()=>{
      console.log("Getting users");
      instance.get('/operation/')  
      .then(response => {
        for(const key in response.data){
            operationsData.push({
            operation_title: response.data[key].operation_title,
            is_active: response.data[key].is_active,
            operation_description:response.data[key].operation_description,
            id: response.data[key].id,
            section_id: response.data[key].id,
          })
        }
        setOperations(operationsData)
      })
    
  },[])

console.log(operations)
  let datalist=[];
  operations.forEach((e) => {
          const data = [];
          data.push(e.id);
          data.push(e.section_id);
          data.push(e.operation_title);
        //   data.push(e.is_active);
          data.push(e.operation_description);
          datalist.push(data);
          
    });

    return (
      <Fragment>
     <Paper className="mainContent">
          <br></br>
           <Button variant="contained" color="primary" onClick={handleClickOpen}>
           <AddIcon/>
           </Button>
           <br></br><br></br>
          <MUIDataTable
              title={"Operations List"}
              data={datalist}
              columns={columns}
              options={options}
              className={classes.root}
         />
      <AddOperations open={open} handleClose={handleClose} AddOperation={AddOperation} />
      <EditOperation edit={edit} handleClose={handleClose}  editinput={editinput}  updateOperation={updateOperation}/>
     </Paper>  
     </Fragment>
    )
}

export default Operations;

