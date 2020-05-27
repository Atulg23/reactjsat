import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, Dialog,Box } from "@material-ui/core";
import  DropDown   from "../../common/DropDown";


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


const type = [
  {
    value: "Internal",
    label: "Internal"
  },
  {
    value: "External",
    label: "External"
  }
]


const EditProject = (props) => {

    const classes = useStyles(0);

    const inputData = { id:props.editinput.id, 
        name: props.editinput.name,
        short_name: props.editinput.short_name,
        code: props.editinput.code,
        customer_id:props.editinput.customer_id, 
        project_type: props.editinput.project_type,
       
    }
        
        const [values, setValues] = useState(inputData)
        const [customerarray, setCustomerArray] = useState([]);
      //  const [customerIDs, setcustomerIDs] = useState([]);
        const[projectType, setProjectType] = useState([])
  

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    let projectTypeData=[];
    let custArray=[]; 
    useEffect(()=>{
        console.log("Getting customers");
        instance.get('/customers/')
        .then(response => {
          for(const key in response.data){
            custArray.push({
              id: response.data[key].id,
              name: response.data[key].name
            })
            setCustomerArray(custArray);
            console.log(custArray);
          }
        })
        instance.get('/project_types/')
        .then(response => {
            //console.log(response.data)
            for (const key in response.data) {
                projectTypeData.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    // short_name: response.data[key].short_name,
                    // description: response.data[key].description,
                    parent_id: response.data[key].parent_id,
                })
               
            }
            setProjectType(projectTypeData)
          
        })
      
      },[])
console.log(props);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.editinput.name)
        console.log(values)
        // console.log(inputData)
    
           let updatedName,updatedShort_name, updatedCode, updatedCustomer_id,updatedProject_type, UpdatedIs_intenal;
         
           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.editinput.name         
            if(values.short_name)
                updatedShort_name=values.short_name;
            else
                updatedShort_name=props.editinput.short_name;        
            if(values.code)
                updatedCode=values.code;
            else
                updatedCode=props.editinput.code;
            if(values.customerData)
                updatedCustomer_id=values.customerData.id;
            else
               updatedCustomer_id=props.editinput.customer_id         
            if(values.project_type)
              updatedProject_type=values.project_type;
            else
              updatedProject_type=props.editinput.project_type;  
            if(values.is_internal)
              UpdatedIs_intenal=values.is_internal;
            else
            UpdatedIs_intenal=props.editinput.is_internal;        
           
                   
                let data={
                    name: updatedName ,
                    short_name: updatedShort_name,
                    code: updatedCode ,
                    customer_id:  updatedCustomer_id,
                    project_type: updatedProject_type,
                    is_internal:UpdatedIs_intenal,
                               
                 }
           
                console.log(data)
           instance.put(`/projects/${props.editinput.id}`,data)
           .then(res => {
           console.log(res);
                props.updateProject(data,props.editinput.id);
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
                            label="name"
                            defaultValue={inputData.name}
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="short_name"
                            defaultValue={props.editinput.short_name}
                            className={classes.textField}
                            value={values.short_name}
                            onChange={handleChange("short_name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="code"
                            defaultValue={props.editinput.code}
                            className={classes.textField}
                            value={values.code}
                            onChange={handleChange("code")}
                            margin="normal"
                            variant="outlined"
                        /><br></br>
                      <Autocomplete
                            id="customer IDs and Titles"
                            options={customerarray}
                            getOptionLabel={option=>option.name}
                            onChange={(event,customerData)=>
                                {
                                    setValues({...values,customerData});
                                } }
                            renderOption={option=> (
                            <React.Fragment>
                            <b>{option.id}</b>&emsp;{option.name}
                            </React.Fragment>
                            )}
                            renderInput={ params=> <TextField style={{width:"60%"}} {...params} label="customer IDs and Names"variant="outlined"
                            />}
                       /><br></br>
                    <Autocomplete 
                        id="Project Types List"
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
                       
                        renderInput={ params=> <TextField style={{width:"60%"}} {...params} label="ProjectType list"variant="outlined"
                        />}
                    />
                    <Box style={{width:"70%"}}>
                <DropDown 
                  required={true}
                  defaultValue={props.editinput.is_internal}
                  id="is_internal"
                  label="Select  Type"
                  values={values.is_internal}
                  handleChange={handleChange}
                  data={type}
                />
              </Box>
                      
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
