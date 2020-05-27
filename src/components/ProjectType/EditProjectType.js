import React, { Fragment,useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
//import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
import  Autocomplete  from '@material-ui/lab/Autocomplete';


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



const EditProjectType = (props) => {

    const classes = useStyles(0);
    const initialInputs = {  
        name:props.viewEdit.name,  
        short_name: props.viewEdit.short_name,  
        desription: props.viewEdit.desription,
        parent_id: props.viewEdit.parent_id,
    }
    const [values, setValues] = React.useState(initialInputs)
    const[projectType, setProjectType] = useState([]);
    let projectTypeData = [];
    useEffect(() => {
       console.log("Getting users");
       instance.get('/project_types/')
            .then(response => {
                console.log(response.data)
              
                for (const key in response.data) {
                    projectTypeData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        short_name: response.data[key].short_name,
                        description: response.data[key].description,
                        parent_id: response.data[key].parent_id,
                        
                        
                    })
                   
                }
                setProjectType(projectTypeData)
              
            })
           // console.log(customer)

    }, [])


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        //e.preventDefault()

           let updatedName, updatedShortName,updatedDescription,updatedParentId;

           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.viewEdit.name;
            
            if(values.short_name)
                updatedShortName=values.short_name;
            else
                updatedShortName=props.viewEdit.short_name;
             
            if(values.description)
            updatedDescription=values.description;
            else
            updatedDescription=props.viewEdit.description;

            
            if(values.projectTypeData)
                updatedParentId=values.projectTypeData.id;   
            else 
                updatedParentId=props.viewEdit.parent_id;  
           
           
                let data={
                    name: updatedName ,
                    short_name: updatedShortName , 
                    description: updatedDescription,
                    parent_id: updatedParentId,

                 }
           
                console.log(data)
       
           instance.put(`/project_types/${props.viewEdit.id}`,data)
           .then(res => {
           console.log(res);
            swal({
                title: "Done!",
                text: "Record Updated Successfully!",
                icon: "success",
                timer: 1000,
                button: false
           })
           props.editImput();
           
            })
            .catch(error=>{console.log(error)})
 
    }
   

    return (
        <Fragment>
            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update ProjectType</DialogTitle>    
                <form onSubmit={handleSubmit}>         
                    <DialogContent>               
                    <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter ProjectType Name"
                            defaultValue={props.viewEdit.name}
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField  style={{width:"45%",marginLeft:"50px"}}
                            required
                            id="outlined-name"
                            label="Enter Short Name"
                            defaultValue={props.viewEdit.short_name}
                            className={classes.textField}
                            value={values.short_name}
                            onChange={handleChange("short_name")}
                            margin="normal"
                            variant="outlined"
                        />
                         <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter ProjectType Description"
                            defaultValue={props.viewEdit.description}
                            className={classes.textField}
                            value={values.code}
                            onChange={handleChange("description")}
                            margin="normal"
                            variant="outlined"
                        />
                        <Autocomplete 
                         id="ProjectType List"
                        options={projectType}
                        getOptionLabel={option=>option.name}
                        onChange={(event,projectTypeData)=>
                            {
                            setValues({...values,projectTypeData});
                            } }
                        renderOption={option=> (
                        <React.Fragment>
                        <b>{option.id}</b>&emsp;{option.name}
                        </React.Fragment>
                        )}
                        style={{ width:"30%" }}
                        renderInput={ params=> <TextField {...params} label="Select Project Type"variant="outlined"
                        />}
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

export default EditProjectType;
