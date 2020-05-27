import React, { Fragment, useState } from "react";
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



const AddOrganization = (props) => {

    const classes = useStyles(0);
    const initialInputs = { id: " ", name: "", short_name: "" ,is_active:true}
    const [values, setValues] = React.useState(initialInputs)
 //   const [organization, setorganization] = useState([]);


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
          console.log(e.name);
            console.log(values);
            
             let data={
                name: values.name,
                is_active: values.is_active,
                short_name: values.short_name,
                description: values.description,
            }
            console.log(data);
            
            instance.post('/organizations/',data)
            .then((response) => {
                console.log(response);
                //swal("Good job!", "Record inserted successfully!", "success");
                props.addInput(data)
              }, (error) => {
                console.log(error);
              });

              swal({
                title: "Done!",
                text: "Record Added Successfully!",
                icon: "success",
                timer: 1000,
                button: false
           })
              setValues(initialInputs);
              
    }

    return (
        <Fragment>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Organization</DialogTitle>
                <form onSubmit={handleSubmit}>
                    
                    
                    
                    
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="Enter name"
                            defaultValue=""
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter short_name"
                            defaultValue=""
                            className={classes.textField}
                            value={values.short_name}
                            onChange={handleChange("short_name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter Description"
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
                        <Button color="primary" type="submit" onClick={props.handleClose}>save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default AddOrganization;
