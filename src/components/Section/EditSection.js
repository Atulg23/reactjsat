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

const EditSection = (props) => {
    
    const classes = useStyles(0);
    const initialInputs = { section_title:props.view.section_title, section_description:props.view.section_description ,is_active:true}
    const [values, setValues] = React.useState(initialInputs)


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {

           let updatedsection_title;
           let updatedsection_description;
           
           if(values.section_title)
              updatedsection_title=values.section_title;
           else
              updatedsection_title=props.view.section_title;
            
            if(values.section_description)
                updatedsection_description=values.section_description;
            else
                 updatedsection_description=props.view.section_description;
           
           
           
                let data={
                    section_title: updatedsection_title ,
                    is_active: values.is_active,
                    section_description : updatedsection_description
                 }
           
                console.log(data)
       
           instance.put(`/Sections/${props.view.id}`,data)
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
                <DialogTitle id="form-dialog-title">Edit Section</DialogTitle>
                <form onSubmit={handleSubmit}>
                    
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="Enter section_title"
                            defaultValue={props.view.section_title }
                            className={classes.textField}
                            value={values.section_title}
                            onChange={handleChange("section_title")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter section_description"
                            defaultValue={props.view.section_description}
                            className={classes.textField}
                            value={values.section_description}
                            onChange={handleChange("section_description")}
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

export default  EditSection ;

