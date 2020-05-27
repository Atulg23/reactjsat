import React, {  useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
//import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import instance from '../../common/instance';
import swal  from 'sweetalert';
import AddDomain from './AddDomain';
import EditDomain from './EditDomain';
import AddIcon from '@material-ui/icons/Add';

// const useStyles = () =>
//     makeStyles({
//         root: {
//             width: "500%",

//         },
//         container: {
//             maxHeight: 440,
//         },
//         textField: {
//             width: "95%",

//         },
//         row: {
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             width: "100%"
//         }

//     });

const Domain = () => {

    const columns = [
        { label: "Id",name: "id", options:{display:false,sortDirection:'asc'}},
        { label: "Name", name: "name"},
        { label: "Description", name: "description" },
        { label: " Parent_Id", name: "parent_id" },        
        {
            label: "Actions", 
            options: {
                alignItems: 'center',
                filter: false,
                sort: false,
                empty: true,
              
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;
                    return (
                       
                        <div>
                           {/* <IconButton>
                                <VisibilityIcon color="primary"/>
                            </IconButton> */}
                            <IconButton onClick={() => handleClickOpenEdit(rowId[0])} >
                                <EditIcon style={{ color: 'green' }}  />
                            </IconButton>
                            <IconButton onClick={()=>handleClickDelete(rowId[0])}>
                                <DeleteIcon color="secondary"    />
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

const[domains, setDomains] = useState([]);
//const[details,setDetails] = useState([false])
const [open, setOpen] = useState(false);
const [add, setAdd] = useState(false);
const [edit, setEdit] = useState(false);
const [ view,setView]=useState([]) 
const [ viewEdit,setViewEdit]=useState([]) 



let domainsData = [];
    useEffect(() => {
       console.log("Getting Domains");
       instance.get('/domains/')
            .then(response => {
                console.log(response.data)
              
                for (const key in response.data) {
                    domainsData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        description: response.data[key].description,
                        parent_id: response.data[key].parent_id,
                        
                        
                    })
                   
                }
                setDomains(domainsData)
              
            })
           // console.log(customer)

    }, [])
   console.log(domains)
    let datalist = [];
    domains.forEach((t) => {
        const data = [];
        data.push(t.id);
        data.push(t.name);
        data.push(t.description);
        data.push(t.parent_id);
        
        datalist.push(data);
         // console.log(datalist);
    });

//     const handleClickOpen = (id) => {
//         setOpen(true);
//         setView(domains.filter(data=>data.id === id))
    
//   };
   const handleClose = () => {
       setOpen(false);
       setAdd(false);
       setEdit(false);
   };
   const handleClickOpenAdd = (id) => {
    setAdd(true);
};
const handleClickOpenEdit = (id) => {
       
    console.log(id);
    setViewEdit((domains.filter(data => data.id === id)[0]));
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
            setDomains(domains.filter(data=>data.id !== id))
            instance.delete(`/domains/${id}`)
            .then(res => {
                console.log(res);
               }).catch(error=>{console.log(error)})
            swal("Poof! The Record file has been deleted!", {
            icon: "success",
          });
        
        } else {
          swal("The Record is safe!");

        }

      });
}


  
 const addInput = data => {
    domains.id = domains.length + 1;
     setDomains([...domains, data])
    window.location.reload();
 }
 const editInput = data => {

    window.location.reload();
 }




return(
<Paper className="mainContent">
<Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
                <AddIcon/>
          </Button>  <br></br>  <br></br>
            <MUIDataTable
                title={"Domains List"}
                data={datalist}
                columns={columns}
                options={options}
            />
            <AddDomain add={add} handleClose={handleClose}  addInput={addInput}/>
            <EditDomain  edit={edit} handleClose={handleClose} viewEdit={viewEdit}  editInput={editInput}/>
        </Paper>
        
        )


    }
export default Domain;

