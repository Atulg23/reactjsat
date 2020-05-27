import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
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


const AddRole = (props) => {

    const classes = useStyles(0);
    const initialInputs = {role_title:"", role_description:"" ,is_active:true}
    const [values, setValues] = React.useState(initialInputs)


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
          console.log(e.name);
            console.log(values);
            

             let data={
                 id:values.id,
                 role_title: values.role_title,
                is_active: true,
                role_description: values.role_description,
                
            }
            console.log(data);
            
            instance.post('/roles/',data)
            .then((response) => {
                console.log(response);
                swal("Good job!", "Record inserted successfully!", "success");
                props.addInput(data)
              }, (error) => {
                console.log(error);
              });

              setValues(initialInputs);
              //window.location.reload();
    }

    return (
        <Fragment>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Role</DialogTitle>
                <form onSubmit={handleSubmit}>
                  
                    <DialogContent>
                        <TextField
                            id="outlined-name"
                            label="Enter role_title"
                            defaultValue=""
                            className={classes.textField}
                            value={values.role_title}
                            onChange={handleChange("role_title")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter role_description"
                            defaultValue=""
                            className={classes.textField}
                            value={values.role_description}
                            onChange={handleChange("role_description")}
                            margin="normal"
                            variant="outlined"
                        />
                      
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={props.handleClose}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default AddRole;
