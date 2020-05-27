import React, { Fragment } from "react";
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
        width: "100%"
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

const EditRole = (props) => {
    
    const classes = useStyles(0);
    const initialInputs = { role_title:props.view.role_title, role_description:props.view.role_description ,is_active:true}
    const [values, setValues] = React.useState(initialInputs)


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {

           let updatedrole_title;
           let updatedrole_description;
           
           if(values.role_title)
              updatedrole_title=values.role_title;
           else
              updatedrole_title=props.view.role_title;
            
            if(values.role_description)
                updatedrole_description=values.role_description;
            else
                 updatedrole_description=props.view.role_description;
           
           
           
                let data={
                    role_title: updatedrole_title ,
                    is_active: values.is_active,
                    role_description : updatedrole_description
                 }
           
                console.log(data)
       
           instance.put(`/roles/${props.view.id}`,data)
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
                <DialogTitle id="form-dialog-title">Edit Role</DialogTitle>
                <form onSubmit={handleSubmit}>
                    
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="Enter role_title"
                            defaultValue={props.view.role_title }
                            className={classes.textField}
                            value={values.role_title}
                            onChange={handleChange("role_title")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter role_description"
                            defaultValue={props.view.role_description}
                            className={classes.textField}
                            value={values.role_description}
                            onChange={handleChange("role_description")}
                            margin="normal"
                            variant="outlined"
                        />
                        <DropDown
                            id="is_active"
                            label="Status"
                            defaultValue={props.view.is_active}
                            values={values.is_active}
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

export default  EditRole ;

