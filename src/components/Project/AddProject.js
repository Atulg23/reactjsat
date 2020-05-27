import React, { Fragment,useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog,Box } from "@material-ui/core";
import  DropDown   from "../../common/DropDown";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance'
import Autocomplete from '@material-ui/lab/Autocomplete';




const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
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


    const AddProject = (props) => {

      const [customer, setCustomer] = useState([]);
      const[projectType, setProjectType] = useState([]);
     
      const initialInputs = { id:"", name:"",short_name: "",code:"", customer_id: "", project_type: [],is_internal:""}
      const [projects,setProjects]=useState([]);
    //  const [values, setValues] = React.useState(initialInputs)

      let customerData=[]; 
     let projectTypeData=[];
      useEffect(()=>{
          console.log("Getting customers");
          instance.get('/customers/')
          .then(response => {
            for(const key in response.data){
              customerData.push({
                id: response.data[key].id,
                name: response.data[key].name
              })
              setCustomer(customerData);
             // console.log(customerData);
            }
          })
        
          instance.get('/project_types/')
          .then(response => {
              //console.log(response.data)
              for (const key in response.data) {
                  projectTypeData.push({
                      id: response.data[key].id,
                      name: response.data[key].name,
                   
                  })
                 
              }
              setProjectType(projectTypeData)
            
          })
        

        },
        [])
        let newProjectType=[];
        for(const key in projects.projectTypeData){
          newProjectType.push({
              id: projects.projectTypeData[key].id,
              name: projects.projectTypeData[key].name,
            })
          }
     // console.log(projects.customerData);
      const data = [];   
      newProjectType.forEach((c) => {
     
        data.push(c.id);
      
    });

    const classes = useStyles(0);
   
  
    const handleChange = (name) => (event) => {
        setProjects({ ...projects, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
      

        event.preventDefault();
        let obj={
            name:projects.name,
            short_name:projects.short_name,
            code:projects.code,
            customer_id:projects.customerData.id,
            project_type:data,
            is_internal: projects.is_internal
           
        }
      
        console.log(obj); 
        instance.post('/projects/',obj)
        .then(response=>{
            console.log(response);
            props.addProject(obj);
        })
        .catch(error=>{
            console.log(error);
        })
        setProjects(initialInputs);
    }

    return (
      <Fragment>
       
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
          <TextField
            id="outlined-name"
            label="Project Name"
            defaultValue=""
            className={classes.textField}
            value={projects.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Short Name"
            defaultValue=""
            className={classes.textField}
            value={projects.short_name}
            onChange={handleChange("short_name")}
            margin="normal"
            variant="outlined"
          />         
          <TextField
            id="outlined-name"
            label="Project Code"
            defaultValue=""
            className={classes.textField}
            value={projects.code}
            onChange={handleChange("code")}
            margin="normal"
            variant="outlined"
          />
          <br></br> <br></br>
         <Autocomplete
                  id="Customers"
                  options={customer}
                  getOptionLabel={option=>option.name}
                  onChange={(event,customerData)=>
                    {
                      setProjects({...projects,customerData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  </React.Fragment>
                   )}
                   className={classes.autoComplete}
                  renderInput={ params=> <TextField   {...params} label="Select Customer"variant="outlined"
                  />}
               />
               <br></br>
        <Autocomplete 
              multiple
                  id="Project Types List"
                  options={projectType}
                  getOptionLabel={option=>option.name}
                  onChange={(event,projectTypeData)=>
                    {
                      setProjects({...projects,projectTypeData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  </React.Fragment>
                   )}
                   className={classes.autoComplete}
                  renderInput={ params=> <TextField   {...params} label="ProjectType list"variant="outlined"
                  />}
               />
              <Box style={{width:"70%"}}>
                <DropDown 
                  required={true}
                  id="is_internal"
                  label="Select  Type"
                  values={projects.is_internal}
                  handleChange={handleChange}
                  data={type}
                />
              </Box>
                  
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" >Cancle</Button>
            <Button onClick={props.handleClose} color="primary" type="submit">Save</Button>
          </DialogActions>       
      </form>
        </Dialog>
       
      </Fragment>
    );
  };
  
  export default AddProject;
  