import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import instance from '../../common/instance';
import TextField from '@material-ui/core/TextField';
import  Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import DialogTitle  from '@material-ui/core/DialogTitle';
import  DialogContent  from '@material-ui/core/DialogContent';

const useStyles = makeStyles(() => ({
  
    textField: {
      width: "70%",
    },
    autoComplete: {
      width: "70%",
    },
    dialogcontent: {
        width: "100%"
      },
    dense: {
    },
    menu: {
      width: 200
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

const SOW=(props)=> {
  const classes = useStyles();
  const initialInputs = {  project_id: "",documents:""}
  const [values, setValues] = useState(initialInputs)
  const [projects,setProjects]=useState([]);

  let projectData=[]; 
  useEffect(()=>{
      console.log("Getting users");
      instance.get('/projects/')
      .then(response => {
        for(const key in response.data){
            projectData.push({
            id: response.data[key].id,
            name: response.data[key].name,
            
          
          })
        }
        setProjects(projectData)
      })
    
  },[])

  const handleChange = (name) => (event) => {
    // console.log(name);
    // console.log(event);

    setValues({ ...values, [name]: event.target.value });
}
const handleSubmit = (e) => {
    e.preventDefault()

    console.log(values);
    // var sd = new Date(values.start_date);
    // var start_date = sd.toISOString();

    // var ed = new Date(values.end_date);

    // var end_date = ed.toISOString();


    let data = {
       
    
        project_id: props.proj_id.id,
        documents:values.documents    
       
    }
    console.log(data);
    instance.post('/SOW/', data)
    .then((response) => {
        console.log(response);
        //swal("Good job!", "Record inserted successfully!", "success");
        props.addSow(data)
    }, (error) => {
        console.log(error);
    });

}
  return (
    <div className="mainContent">
     <Dialog
                open={props.sow}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add SOW to Project</DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <p>Please Choose Some Files </p>
                    <input
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        onChange={handleChange("documents")}
                        type="file"
                    />
                    
                    <br></br><br></br>
                 <Autocomplete  
                                id="ProjectList"
                                options={projects}
                                getOptionLabel={option=>option.name}
                                onChange={(event,projectData)=>
                                    {
                                        setValues({...values,projectData});
                                    } }
                                renderOption={option=> (
                                <React.Fragment>
                                <b>{option.id}</b>&emsp;{option.name}
                                </React.Fragment>
                                )}
                                style={{ width:"60%" }}
                                renderInput={ params=> <TextField {...params} label="Select Project"variant="outlined"
                                />}
                                />
                                <div>
                                <TextField
                                    id="outlined-adornment"
                                    label="From Date"
                                    type="date"
                                    className={classes.textField}
                                    value={values.from_date}
                                    onChange={handleChange("from_date")}
                                    margin="normal"
                                    variant="outlined"                                  
                                /> 
                                  <TextField
                                    id="outlined-adornment"
                                    label="End Date"
                                    type="date"
                                    className={classes.textField}
                                    value={values.end_date}
                                    onChange={handleChange("end_date")}
                                    margin="normal"
                                    variant="outlined"                                  
                                /> 
                                <br></br><br></br>
                                <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
                                        Upload
                                </Button>
                            </div>
                        </DialogContent>
                    </form>

                </Dialog>
             
    </div>
  );
}
export default SOW;