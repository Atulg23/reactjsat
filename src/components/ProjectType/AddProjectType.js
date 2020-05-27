import React, { Fragment,useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
 import swal from 'sweetalert';
// import Paper from '@material-ui/core/Paper';
import  Autocomplete  from '@material-ui/lab/Autocomplete';



// const status = [
//     {
//       value: "true",
//       label: "true"
//     },
//     {
//       value: "false",
//       label: "false"
//     }
// ]


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



const AddProjectType = (props) => {
    const classes = useStyles(0);
    
    const initialInputs = {name: "", short_name: "", description:"",parent_id:0}
    
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
           

    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(values);
         let newParentId ;
         if(values.projectTypeData)
             newParentId=values.projectTypeData.id;
         else
            newParentId = values.parent_id;

            
             let data={
                name: values.name,
                short_name: values.short_name,
                description: values.description,
                parent_id: newParentId,

            }
            console.log(data);
            
            instance.post('/project_types/',data)
            .then((response) => {
                console.log(response);
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
           
              setValues(data);
              
    }


    return (
        <Fragment>
            <Dialog
                open={props.add}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Project-Type</DialogTitle>    
                <form onSubmit={handleSubmit}>         
                    <DialogContent>               
                    <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter ProjectType Name"
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
                            className={classes.textField}
                            value={values.description}
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
                        renderInput={ params=> <TextField {...params} label="Select Parent ProjectType"variant="outlined"
                        />}
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

export default AddProjectType;
