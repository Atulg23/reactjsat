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



const EditOperation = (props) => {

    const classes = useStyles(0);

    const inputData = { operation_title:props.editinput.operation_title, 
        is_active:true,
        operation_description: props.editinput.operation_description,
        operation_id: props.editinput.operation_id,
        section_id: props.editinput.section_id}
        
        const [values, setValues] = React.useState(inputData)
       // const [obj, setObj] = useState([]);



    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const [section, setSection] = useState([]);

    let sectionData = [];
    useEffect(() => {
        console.log("Getting sections");
        instance.get('/Sections/')
            .then(response => {
                for (const key in response.data) {
                    sectionData.push({
                        id: response.data[key].id,                      
                        section_title: response.data[key].section_title,
                        section_description: response.data[key].section_description,
                    })

                }
                setSection(sectionData)
                
            })

    }, []) 


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.editinput.operation_title)
        console.log(values)
        console.log(inputData)
    
           let updatedTitle;
           let updatedDesc;
           let updatedSectionId;
           
           
           if(values.operation_title)
                updatedTitle=values.operation_title;
           else
                updatedTitle=props.editinput.operation_title         
            if(values.operation_description)
                updatedDesc=values.operation_description;
            else
                updatedDesc=props.editinput.operation_description;        
            if(values.sectionData)
                updatedSectionId=values.sectionData.id;
            else
               updatedSectionId=props.editinput.section_id;
                   
                let data={
                    operation_title: updatedTitle ,
                    is_active: values.is_active,
                    operation_description: updatedDesc ,
                    section_id: updatedSectionId ,    
                    is_active:true      
                 }
                 console.log(values)
                console.log(data)
       
           instance.put(`/operation/${props.editinput.id}`,data)
           .then(res => {
           console.log(res);
            props.updateOperation(data,props.editinput.id);      
            })
            .catch(error=>{console.log(error)})
    }
   

    return (
        <Fragment>

            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Organization</DialogTitle>
                <form onSubmit={handleSubmit}>                
                    <DialogContent>        
                        <TextField
                            id="outlined-name"
                            label="operation_title"
                            defaultValue={inputData.operation_title}
                            className={classes.textField}
                            value={values.operation_title}
                            onChange={handleChange("operation_title")}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="operation_description"
                            defaultValue={props.editinput.operation_description}
                            className={classes.textField}
                            value={values.operation_description}
                            onChange={handleChange("operation_description")}
                            margin="normal"
                            variant="outlined"
                        />
                        <Autocomplete
                            id="Section list"
                            options={section}
                            getOptionLabel={option=>option.section_title}
                        defaultValue={props.editinput.section_id}
                        value={values.section_id}
                            onChange={(event,sectionData)=>
                                {
                                    setValues({...values,sectionData});
                                } }
                            renderOption={option=> (
                            <React.Fragment>
                            <b>{option.id}</b>&emsp;{option.section_title}
                            </React.Fragment>
                            )}
                            style={{ width:"72%" }}
                            renderInput={ params=> <TextField {...params} label="Section List" variant="outlined"/>}
                        />
                         <div style={{width:"70%"}}>
                         <DropDown
                            id="is_active"
                            label="Status"
                            defaultValue={values.is_active}
                            values={values.is_active}
                            handleChange={handleChange}
                            data={status}
                        />
                         </div>
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




export default EditOperation;
