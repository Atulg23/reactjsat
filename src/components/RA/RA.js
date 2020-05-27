import React,{useState,useEffect, Fragment} from 'react';
import { createMuiTheme, Grid } from '@material-ui/core';
// import  IconButton  from '@material-ui/core/IconButton';
// import  VisibilityIcon  from '@material-ui/icons/Visibility';
// import  EditIcon  from '@material-ui/icons/Edit';
// import { useEffect, Fragment}  from 'react';
 import instance from './../../common/instance';
 import  Paper  from '@material-ui/core/Paper';
 import {MuiThemeProvider}  from '@material-ui/core';
// import  MUIDataTable  from 'mui-datatables';
// import  Dialog  from '@material-ui/core/Dialog';
// import  DialogTitle  from '@material-ui/core/DialogTitle';
// import  DialogContent  from '@material-ui/core/DialogContent';
// import  DialogContentText  from '@material-ui/core/DialogContentText';
// import DialogActions  from '@material-ui/core/DialogActions';
// import  Button  from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import  Button  from '@material-ui/core/Button';
import axios from 'axios';

  
const ResourceAllocation = () => {
  const [employee, setEmployee] = React.useState()
  const [organization, setOrganization] = useState([]);
  const [departments,setDepartments]=useState([]);
  const [du, setDu] = useState([]);
  const[technology, setTechnology] = useState([]);
  const [projects,setProjects]=useState([]);
  const [input,setInput]=useState([])

  let employeeData=[]; 
  let organizationData = [];
  let departmentsData=[]; 
  let duData = [];
  let technologyData = [];
  let projectData=[]; 


  useEffect(()=>{
      console.log("Getting users");
      instance.get('/Employees/')
      .then(response => {
        //console.log(response.data.employees)
        for(const key in response.data){
          employeeData.push({
            id: response.data[key].id,
            display_name: response.data[key].display_name,
            // email_id:response.data[key].email_id ,
            // gender: response.data[key].gender,
            // dob: response.data[key].dob,
            // is_active: response.data[key].is_active,
            // created_on:response.data[key].created_on,
            // joining_date:response.data[key].joining_date ,
            // updated_on:response.data[key].updated_on ,
            // last_working_day:response.data[key].last_working_day,
            // deleted_on: response.data[key].deleted_on,
            // first_name: response.data[key].first_name,
            // resigned:response.data[key].resigned ,
            // photo_path: response.data[key].photo_path,
            // last_name:response.data[key].last_name ,
            // employee_id:response.data[key].employee_id ,
            // middle_name: response.data[key].middle_name,
            // on_boarded_by:response.data[key].on_boarded_by ,
            // on_boarded_on: response.data[key].on_boarded_on
          })
       
        }
        setEmployee(employeeData)
        console.log(employeeData)
      })
    
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  instance.get('/organizations/')
  .then(response => {
      //console.log(response.data.employees)
      for (const key in response.data) {
          organizationData.push({
              
              id: response.data[key].id,
              name: response.data[key].name,
              // short_name: response.data.organization[key].short_name,
              // description: response.data.organization[key].description,
          })
      }
      setOrganization(organizationData)
      console.log(organizationData)
  }) 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  instance.get('/departments/')
  .then(response => {
    for(const key in response.data){
        departmentsData.push({
        id: response.data[key].id,
        name: response.data[key].name,
        description: response.data[key].description
      })
    }
    setDepartments(departmentsData)
  })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
instance.get('/technologys/')
            .then(response => {
                console.log(response.data)
              
                for (const key in response.data) {
                    technologyData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        // short_name: response.data[key].short_name,
                        // description: response.data[key].description,
                        // parent_id: response.data[key].parent_id,
                        
                        
                    })
                   
                }
                setTechnology(technologyData)
              
            })

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
instance.get('/projects/')
      .then(response => {
        for(const key in response.data.items){
            projectData.push({
            id: response.data.items[key].id,
            name: response.data.items[key].name,
            short_name: response.data.items[key].short_name,
            code:response.data.items[key].code,
            customer_id: response.data.items[key].customer_id,
            project_type1: response.data.items[key].project_type1,
            project_type2: response.data.items[key].project_type2,
            project_type3: response.data.items[key].project_type3,
          })
        }
        setProjects(projectData)
      })

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const instanceDu = axios.create({
    
  baseURL: 'http://10.21.16.83:9200/api/'
});


instanceDu.get('/delivery_unit/')
  .then(response => {
      console.log(response)
      for (const key in response.data) {
          duData.push({
              id: response.data[key].id,
              name: response.data[key].name,
              from_date: response.data[key].from_date,
              end_date: response.data[key].end_date,
          })
          // console.log(response.data[key].id);
      }
       setDu(duData)
      // console.log(employeeData)
  })
  .catch(error=>{console.log(error)})
//++++++++++++++++++++++++++++++++++++++++++++++

},[])
 
const handleClickEdit = (id) => {
  console.log(projects);
  console.log(id);
  setInput((projects.filter(obj => obj.id === id)[0]));

};



    return (
      <Fragment>
     <Paper className="mainContent" style={{maxHeight:"100%",width:"100%"}}>
        <div></div>
          <Autocomplete 
                  id="Employee List"
                  options={employee}
                  getOptionLabel={option=>option.display_name}
                  onChange={(event,employeeData)=>
                    {
                      setEmployee({...employee,employeeData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.display_name}
                  </React.Fragment>
                   )}
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Employee"variant="outlined"
                  />}
               />
           
           <Autocomplete 
                  id="Organization List"
                  options={organization}
                  getOptionLabel={option=>option.name}

                  onChange={(event,organizationData)=>
                    {
                      setOrganization({...organization,organizationData});
                    } }
                   
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  
                  </React.Fragment>
                   )}
                  
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Organization"variant="outlined"
                  />}
               />
               <Autocomplete 
                  id="Departments List"
                  options={departments}
                  getOptionLabel={option=>option.name}
                  onChange={(event,departmentData)=>
                    {
                      setDepartments({...departments,departmentData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  </React.Fragment>
                   )}
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Department"variant="outlined"
                  />}
               />

            <Autocomplete 
                  id="Delivery Unit List"
                  options={du}
                  getOptionLabel={option=>option.name}
                  onChange={(event,duData)=>
                    {
                      setDu({...du,duData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  </React.Fragment>
                   )}
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Delivery Unit"variant="outlined"
                  />}
                  />
          <Autocomplete 
                  id="Technology List"
                  options={technology}
                  getOptionLabel={option=>option.name}
                  onChange={(event,technologyData)=>
                    {
                      setTechnology({...departments,technologyData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}
                  </React.Fragment>
                   )}
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Technology"variant="outlined"
                  />}
                  />
          <Autocomplete 
                  id="Projects List"
                  options={projects}
                  getOptionLabel={option=>option.name}
                  onChange={(event,projectData)=>
                    {
                      setProjects({...projects,projectData});

                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.name}&emsp;{option.project_type1}
                  </React.Fragment>
                   )}
                 
                  style={{ width:"30%" }}
                  renderInput={ params=> <TextField {...params} label="Select Project"variant="outlined"
                  />
                }
                  />
                  {/* <TextField
                            id="outlined-name"
                            label="project_type1"
                            defaultValue={input.project_type1}
                            value={input.project_type1}
                           // onChange={handleChange("project_type1")}
                            margin="normal"
                            variant="outlined"
                        /> */}
                        <br></br>
             <Button variant="contained" color="primary" onClick={()=>alert("Resource Allocated Successfully ")}>
                Add Resource
          </Button>

     </Paper>
     </Fragment>
    )
}
export default ResourceAllocation;