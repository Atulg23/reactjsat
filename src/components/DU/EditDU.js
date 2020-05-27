import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
import instance from '../../common/instance';

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

const EditDU = (props) => {

    const classes = useStyles(0);
    const initialInputs = {  name:props.view.name, from_date:props.view.from_date ,end_date:props.view.end_date }
    const [values, setValues] = React.useState(initialInputs)
    const [organization, setorganization] = useState([]);


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {
    
        e.preventDefault();
           let updatedName;
           let updatedfrom_date,updatedend_date;
           
           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.view.name;
            
            if(values.from_date)
                updatedfrom_date=values.from_date;
            else
                updatedfrom_date=props.view.from_date;
           
            if(values.end_date)
                updatedend_date=values.end_date;
            else
                updatedend_date=props.view.end_date;
           
                let data={
                    name: updatedName ,
                    from_date: updatedfrom_date,
                    end_date: updatedend_date ,
                    is_active:true
                 }
           
                console.log(data)
       
                // const instance = axios.create({
                //     //baseURL: 'http://10.11.14.140:5000/api' 
                //     baseURL: 'http://10.21.16.83:9200/api/' 
                // });
                instance.put(`/delivery_unit/${props.view.id}`,data)
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
                <DialogTitle id="form-dialog-title">Edit Delivery Unit</DialogTitle>
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
                           // label="Start Date"
                            defaultValue={props.view.from_date}
                            type="date"
                            className={classes.textField}
                            value={values.from_date}
                            onChange={handleChange("from_date")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            //label="end Date"
                            defaultValue={props.view.end_date}
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
                        <Button color="primary" type="submit" onClick={props.handleClose}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditDU;
