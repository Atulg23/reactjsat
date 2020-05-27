import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DropDown from '../../common/DropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../common/instance';

const status = [
    {
      value: "Build",
      label: "Build"
    },
    {
      value: "Buffer",
      label: "Buffer"
    },
    {
       value: "Billable",
       label: "Billable"
    }
]

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


const EditDUDD = (props) => {

    const classes = useStyles(0);
    const initialInputs = { utilization: props.view.utilization };
    const [values, setValues] = React.useState(initialInputs);
  
    //for emp    
    const [emp, setemp] = useState([]);
    //for Technology
    const [technology, settechnology] = useState([]);
     //for roles
     const [role, setroles] = useState([]);

    let EmployeeData = [];        
    let TechnologyData = [];  
    let RolesData=[]; 
    useEffect(() => {
        console.log("Getting users");

        // const instance = axios.create({
        //     //baseURL: 'http://10.11.14.140:5000/api' 
        //     baseURL: 'http://10.21.16.5:4040/api'
        // });
    
    //For Employee         
        instance.get('/employees/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    EmployeeData.push({
                        id: response.data[key].id,
                        display_name: response.data[key].display_name,
                    })
                   
                }
                 setemp(EmployeeData)
                // console.log(employeeData)
            })
            .catch(error=>{console.log(error)})

            //for Roles
            instance.get('/roles/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    RolesData.push({
                        id: response.data[key].id,
                        role_title: response.data[key].role_title,
                        role_description: response.data[key].role_description,
                        
                    })
                   
                }
                 setroles(RolesData)
                // console.log(employeeData)
            })
            .catch(error=>{console.log(error)})
    // //for technology
       
    instance.get('/technologys/')
    .then(response => {
        //console.log(response)
        for (const key in response.data) {
            TechnologyData.push({
                id: response.data[key].id,
                name: response.data[key].name,
                short_name: response.data[key].short_name,
                description: response.data[key].description,
                version: response.data[key].version,
                parent_id: response.data[key].parent_id,
            })
        }
         settechnology(TechnologyData)
        // console.log(employeeData)
    })
    .catch(error=>{console.log(error)})


       console.log("Getting users done");
    }, [])
  
//  console.log(props);
  


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {
    
        e.preventDefault();
        console.log(values);
        console.log(props);

        
        let updatedEmpId,updatedRoleId,updatedTechId,updatedStatus,updatedutilization,updatedallocation;
           
                if(values.emplist )
                    updatedEmpId=values.emplist.id
                else
                    updatedEmpId=props.view.emp_id
           
                if(values.rolelist )
                    updatedRoleId=values.rolelist.id
                else
                    updatedRoleId=props.view.role_id
                
                if(values.techlist )
                    updatedTechId=values.techlist.id
                else
                    updatedTechId=props.view.tech_id
               
                if(values.allocation_status )
                    updatedStatus=values.allocation_status
                else
                    updatedStatus=props.view.status
               
                if(values.utilization )
                    updatedutilization=values.utilization
                else
                    updatedutilization=props.view.utilization

                if(values.allocation )
                    updatedallocation=values.allocation
                else
                    updatedallocation=props.view.allocation
            

          


        
                let data={
                    
                    emp_id: updatedEmpId,
                    proj_id: props.proj_id.id,
                    role_id:  updatedRoleId,
                    tech_id: updatedTechId,
                    status: updatedStatus,
                    utilization: parseInt(updatedutilization),
                    allocation: parseInt(updatedallocation)
                 }
                 console.log(data);
                 
                 instance.put(`/Resource_Allocation/${props.view.id}`,data)
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
             <DialogTitle id="form-dialog-title">Edit Project Dashboard</DialogTitle>
            <form onSubmit={handleSubmit}>

                <DialogContent>

                   
                    <Autocomplete
                        id="employee list"
                        options={emp}
                        getOptionLabel={option => option.display_name}
                        onChange={(event, emplist) => {
                            setValues({ ...values, emplist });
                        }}
                        renderOption={option => (
                            <React.Fragment>
                                <b>{option.id}</b>&emsp;{option.display_name}
                            </React.Fragment>
                        )}
                        style={{ marginLeft:5 }}
                        renderInput={params => <TextField {...params} label="Select Employee " variant="outlined" />}
                    />
                    <br/>
                    <Autocomplete
                            id="Roles list"
                            options={role}
                            getOptionLabel={option => option.role_title}
                            onChange={(event, rolelist) => {
                                setValues({ ...values, rolelist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    <b>{option.id}</b>&emsp;{option.role_title}
                                </React.Fragment>
                            )}
                            style={{ marginLeft:5 }}
                            renderInput={params => <TextField {...params} label="Roles list" variant="outlined" />}
                        />
                        <br/>
                    
                    <Autocomplete
                        id="Technology Name list"
                        options={technology}
                        getOptionLabel={option => option.name}
                        onChange={(event, techlist) => {
                            setValues({ ...values, techlist });
                        }}
                        renderOption={option => (
                            <React.Fragment>
                                <b>{option.id}</b>&emsp;{option.name}
                            </React.Fragment>
                        )}
                        style={{  marginLeft:8}}
                        renderInput={params => <TextField {...params} label="Technology Name list" variant="outlined" />}
                    />

{/* allocation status 3 values DropDown */}
                            
                        <DropDown
                            id="allocation_status"
                            label="Allocation Status"
                            defaultValue=""
                           
                             className={classes.dropDown}
                            handleChange={handleChange}
                            data={status}
                            onChange={handleChange("allocation_status")}
                             
                            
                        />
{/* Allocation percentage no */}
                        <TextField
                            id="outlined-name"
                            label="Allocation Percentage"
                            defaultValue={props.view.allocation}
                            className={classes.textField}
                            value={values.allocation}
                            onChange={handleChange("allocation")}
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft:5}}
                        />
{/* Utilization percentage no */}
                        <TextField
                            id="outlined-name"
                            label="Utilization Percentage"
                            defaultValue={props.view.utilization}
                            className={classes.textField}
                            value={values.utilization}
                            onChange={handleChange("utilization")}
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft:5}}
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

export default EditDUDD;
