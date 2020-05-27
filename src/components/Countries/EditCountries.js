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


const EditProject = (props) => {

    const classes = useStyles(0);

    const inputData = { id:props.editinput.id, 
        name: props.editinput.name
    }
        
    const [values, setValues] = useState(inputData)

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.editinput.name)
        console.log(values)
        // console.log(inputData)
    
           let updatedName;
           
           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.editinput.name;                    
                let data={
                    name: updatedName           
                 }
           
                console.log(data)
           instance.put(`/countries/${props.editinput.id}`,data)
           .then(res => {
           console.log(res);
            props.updateCountries(data,props.editinput.id);      
            })
            .catch(error=>{console.log(error)})
    }
    return (
        <Fragment>

            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Countries</DialogTitle>
                <form onSubmit={handleSubmit}>                
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="name"
                            defaultValue={inputData.name}
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button onClick={props.handleClose} color="primary" type="submit" >Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditProject;
