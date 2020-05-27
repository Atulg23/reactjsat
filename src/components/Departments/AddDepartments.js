import React, { Fragment,useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance'
import swal from 'sweetalert';
import Autocomplete from '@material-ui/lab/Autocomplete';




const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      width: "100%",
    },
    dialogcontent: {
        width: "100%"
      },
      dropdown: {
        width: "100%"
      },
    dense: {
    },
    menu: {
      width: 200
    },
    row: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%"
    },
    column: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      flex: 1
    }
  }));

    const AddDepartments = (props) => {

    const classes = useStyles(0);
    const initialInputs = { id:"", name:"",description:""}
    const [departments,setDepartments]=useState([]);
  
    const handleChange = (name) => (event) => {
        setDepartments({ ...departments, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
      
      console.log(departments);
        event.preventDefault();
        let obj={
            id:departments.id,
            name:departments.name,
            description:departments.description
        }
        console.log(obj); 
        instance.post('/departments/',obj)
        .then(response=>{
            props.addDepartments(obj);
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        setDepartments(initialInputs);
        swal({
            title: "Done!",
            text: "Operation element deleted..",
            icon: "success",
            timer: 3000,
            button: false
        })
    }

    return (
      <Fragment>       
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Departments</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
          <TextField
            id="outlined-name"
            label="name"
            defaultValue=""
            className={classes.textField}
            value={departments.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          /> 
          <TextField
            id="outlined-name"
            label="description"
            defaultValue=""
            className={classes.textField}
            value={departments.description}
            onChange={handleChange("description")}
            margin="normal"
            variant="outlined"
          /> 
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" >Cancle</Button>
            <Button onClick={props.handleClose} color="primary" type="submit">Save</Button>
          </DialogActions>       
      </form>
        </Dialog>
       
      </Fragment>
    );
  };
  
  export default AddDepartments;
  