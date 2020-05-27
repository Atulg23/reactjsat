import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import instance from '../../common/instance';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import DropDown from '../../common/DropDown';
import Dialog from "@material-ui/core/Dialog";


const status = [
    {
      value: "true",
      label: "true"
    },
    {
      value: "false",
      label: "false"
    }
]

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: "95%",
    },
    dialogcontent: {
        width: "150%"
    },
    dropdown: {
        width: "150%"
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



const AddDesignation = (props) => {

    // swal("Good job!", "You clicked the button!", "success");
    const classes = useStyles(0);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const initialInputs = { name: "", short_name: "", description: "",is_active:true }
    const [values, setValues] = useState(initialInputs)


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    
const handleSubmit = event => {
    event.preventDefault()
  // console.log("post");
  //console.log(values.is_active);
   let data={
       name: values.name,
       short_name: values.short_name,
       description: values.description,
       is_active:true
   }
   console.log(data);
   
   instance.post('/designations/',data)
   .then((response) => {
       console.log(response);
       swal({
        title: "Done!",
        text: "Record Added Successfully!",
        icon: "success",
        timer: 1000,
        button: false
   })
       props.addInput(data);
   }, (error) => {
       console.log(error);
   });
   setValues(data);
   //window.location.reload();
 

}
  
    return (
        <Fragment>
        <Paper style={{ width: 300 }}>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Add Designation</DialogTitle>
               <form onSubmit={handleSubmit} >
                <DialogContent>
                <TextField
                    required
                    id="outlined-name"
                    label="Name"
                    defaultValue=""
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    required
                    id="outlined-name"
                    label="Short Name"
                    defaultValue=""
                    className={classes.textField}
                    value={values.short_name}
                    onChange={handleChange("short_name")}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    required
                    id="outlined-name"
                    label="Designation Descritpion"
                    defaultValue=""
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange("description")}
                    margin="normal"
                    variant="outlined"
                />

                </DialogContent>

                <DialogActions>
                <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                <Button color="primary" type="submit" onClick={props.handleClose} >save</Button>
                </DialogActions>

                </form>

            </Dialog>
            </Paper>

        </Fragment>
    );
};

export default AddDesignation;
