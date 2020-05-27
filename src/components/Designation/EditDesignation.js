import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import DropDown from '../../common/DropDown';
import swal from 'sweetalert';


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: "100%",
    },
    dialogcontent: {
        width: "1000%"
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

const EditDesignation = (props) => {

    const classes = useStyles(0);
    const initialInputs = {  name:props.view.name, short_name:props.view.short_name,description:props.view.description ,is_active:true}
    const [values, setValues] = useState(initialInputs)
  //  const [designation, setdesignation] = useState([]);


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {
    

           let updatedName;
           let updatedShortName;
           let updatedDescription;
           
           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.view.name;
            
            if(values.short_name)
                updatedShortName=values.short_name;
            else
                updatedShortName=props.view.short_name;
           
            if(values.description)
                updatedDescription=values.description;
            else
                  updatedDescription=props.view.description;
           
           
                let data={
                    name: updatedName ,
                    is_active: values.is_active,
                    short_name: updatedShortName ,
                    description: updatedDescription
                 }
           
                console.log(data)
       
           instance.put(`/designations/${props.view.id}`,data)
           .then(res => {
           console.log(res);
            props.editInput(data,props.view.id)
           
            })
            .catch(error=>{console.log(error)})
  
    }
   

    return (
        <Fragment>

            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Designation</DialogTitle>
                <form onSubmit={handleSubmit}>
                    
                    
                    
                    
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="Enter name"
                            defaultValue={props.view.name }
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter short_name"
                            defaultValue={props.view.short_name}
                            className={classes.textField}
                            value={values.short_name}
                            onChange={handleChange("short_name")}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="Enter description"
                            defaultValue={props.view.description}
                            className={classes.textField}
                            value={values.description}
                            onChange={handleChange("description")}
                            margin="normal"
                            variant="outlined"
                        />
                        <DropDown
                            id="is_active"
                            label="Status"
                            defaultValue={props.view.is_active}
                            values={values.status}
                            handleChange={handleChange}
                            data={status}
                        />
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={props.handleClose}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditDesignation;
