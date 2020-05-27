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
import  DatePicker from "../../common/DatePicker";
import { DateTimePicker } from "@material-ui/pickers";




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



const AddDU = (props) => {

    const classes = useStyles(0);
    const initialInputs = { id: " ", name: "",is_active:true,from_date:"",end_date:""}
    const [values, setValues] = React.useState(initialInputs)
    



    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
          //console.log(e.name);
            //console.log(values);
            var fd = new Date(values.from_date);
            var from_date = fd.toISOString();
    
            var ed = new Date(values.end_date);
    
            var end_date = ed.toISOString();
    
            // var d = new Date();
            // var from_date = d.toISOString();
            // var end_date = d.toISOString();

             let data={
                name: values.name,
               
               is_active:true,
                from_date:from_date,
                end_date:end_date
            }
            console.log(data);
            // const instance = axios.create({
            //     baseURL: 'http://10.21.16.83:9200/api/' 
            // });
           
            
            instance.post('/delivery_unit/',data)
            .then((response) => {
                //console.log(response);
                //swal("Good job!", "Record inserted successfully!", "success");
                props.addInput(data)
                window.location.reload();
              }, (error) => {
                console.log(error);
              });


              setValues(initialInputs);
    }

    return (
        <Fragment>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Delivery Unit</DialogTitle>
                <form onSubmit={handleSubmit}>
                    
                    
                    
                    
                    <DialogContent>
                        
                        <TextField
                            id="outlined-name"
                            label="Enter DU name"
                            defaultValue=""
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                      From Date:
                        <TextField
                            id="outlined-name"
                            //label="Start Date"
                            defaultValue=""
                            type="date"
                            className={classes.textField}
                            value={values.start_date}
                            onChange={handleChange("from_date")}
                            margin="normal"
                            variant="outlined"
                        />
                        End Date:
                        <TextField
                            id="outlined-name"
                          //  label="end Date"
                            defaultValue=""
                            type="date"
                            className={classes.textField}
                            value={values.end_date}
                            onChange={handleChange("end_date")}
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

export default AddDU;
