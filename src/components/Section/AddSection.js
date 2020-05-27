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


const AddSection = (props) => {

    const classes = useStyles(0);
    const initialInputs = {section_title:"", section_description:"" ,is_active:true}
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
                section_title: values.section_title,
                is_active: true,
                section_description: values.section_description,
                
            }
            console.log(data);
            
            instance.post('/Sections/',data)
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
                <DialogTitle id="form-dialog-title">Add Section</DialogTitle>
                <form onSubmit={handleSubmit}>
                  
                    <DialogContent>
                        <TextField
                            id="outlined-name"
                            label="Enter section_title"
                            defaultValue=""
                            className={classes.textField}
                            value={values.section_title}
                            onChange={handleChange("section_title")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Enter section_description"
                            defaultValue=""
                            className={classes.textField}
                            value={values.section_description}
                            onChange={handleChange("section_description")}
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

export default AddSection;
