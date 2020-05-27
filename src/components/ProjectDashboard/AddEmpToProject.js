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
    dropDown: {
        width: "78%",
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



const AddEmpToProject = (props) => {
    let emplist=[]
    const [emplistid, setemplistid] = useState([]);
    
    //console.log(props);
   
        // if(props.empidlist.length>0){
        //     console.log("found");
            
        // for (const key in props.empidlist) {
        //     emplist.push({
        //         id:  props.empidlist[key].emp_id,
        //     })
            
        //  }
        //     setemplistid(emplist)
        // }
  
        useEffect(()=>{
            
        if((props.empidlist).length){
            console.log("hi");
            for (const key in props.empidlist) {
                    emplist.push({
                        id:  props.empidlist[key].emp_id,
                    })
                    
                 }
                    setemplistid(emplist)
        }
       else
       console.log("not found");
  
        },[props.empidlist])
        
    const classes = useStyles(0);
    const initialInputs = {  employee_id: "", tech_id: "", proj_id: "", status: "", allocation_percentage: "",utilization_percentage: ""}
   
    const [values, setValues] = React.useState(initialInputs)
    const [organization, setorganization] = useState([]);


    //for multiple api calls 

    //for emp    
    const [emp, setemp] = useState([]);

    //for roles
    const [role, setroles] = useState([]);


    //for Technology
    const [technology, settechnology] = useState([]);

    


    let EmployeeData = [];        
    let TechnologyData = []; 
    let RolesData=[];            
    let duddData = [];                    //for start_date, end_date
    

 
   

    useEffect(() => {
        console.log("Getting users");
        // console.log(props.empidlist[0]);
        
        // const instance = axios.create({
        //     //baseURL: 'http://10.11.14.140:5000/api' 
        //     baseURL: 'http://10.21.16.5:4040/api'
        // });
    
//For Employee         
        instance.get('/employees/')
            .then(response => {
                //console.log(response)
                console.log(props);
                 console.log(emplistid)
                for (const key in response.data) {
                    // if(props.empidlist[key].emp_id==response.data[key].id){
                        EmployeeData.push({
                            id: response.data[key].id,
                            display_name: response.data[key].display_name,
                        })
                       
                    // }
                 
                }
                // for(const key in props.empidlist){
                //     console.log(props.empidlist[key].emp_id);
                    
                // }
                 setemp(EmployeeData)
                // console.log(employeeData)
               // console.log(props.empidlist[0].emp_id);
               console.log(emplistid)
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
    //for technology
       
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


    const handleChange = (name) => (event) => {
        // console.log(name);
        //  console.log(event.target.value);

        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(values);
        console.log(props);
        console.log(emplistid);
        let check=false;
        // var sd = new Date(values.start_date);
        // var start_date = sd.toISOString();

        // var ed = new Date(values.end_date);

        // var end_date = ed.toISOString();

     //same project    
    if(emplistid){
        console.log("found");
       if((props.empidlist).length) {
        for(let key in props.empidlist)
        {
            console.log(emplistid[key].id);
            if(props.empidlist[key].emp_id==values.emplist.id){
                swal("Error", "Same Employee Already Assigned To This Project !", {
                    // button:false,
                    // timer:2000,
                    icon:"warning"
                });
                break;
            }
            else
            {
                let data = {
           
                    emp_id: values.emplist.id,
                    tech_id: values.techlist.id,
                    role_id: values.rolelist.id,
                    proj_id: props.proj_id.id,
                    status:values.allocation_status,
                   
                    utilization:parseInt(values.utilization),
                    allocation:parseInt(values.allocation)
                   
                }
                console.log(data);
        
               
        
                instance.post('/Resource_Allocation/', data)
                    .then((response) => {
                        console.log(response);
                        // emplistid.push({id:values.emplist.id});

                        swal("Good job!", "Record inserted successfully!", {
                            button:false,
                            timer:2000,
                            icon:"success"
                        });
                        props.addInput(data)
                        
                    }, (error) => {
                        console.log(error);
                    });
        
        
                setValues(initialInputs);
                // props.handleClose(false)
                break;
            }
            
        }}
        else{
            console.log("hi");
            let data = {
           
                emp_id: values.emplist.id,
                tech_id: values.techlist.id,
                role_id: values.rolelist.id,
                proj_id: props.proj_id.id,
                status:values.allocation_status,
               
                utilization:parseInt(values.utilization),
                allocation:parseInt(values.allocation)
               
            }
            console.log(data);
    
           
    
            instance.post('/Resource_Allocation/', data)
                .then((response) => {
                    console.log(response);
                    // emplistid.push({id:values.emplist.id});

                    swal("Good job!", "Record inserted successfully!", {
                        button:false,
                        timer:2000,
                        icon:"success"
                    });
                    props.addInput(data)
                    
                }, (error) => {
                    console.log(error);
                });
    
    
            setValues(initialInputs);
            // props.handleClose(false)
           // break;
        }
        
        
    }
    else{
        console.log("in else");
        
        let data = {
           
            emp_id: values.emplist.id,
            tech_id: values.techlist.id,
            role_id: values.rolelist.id,
            proj_id: props.proj_id.id,
            status:values.allocation_status,
           
            utilization:parseInt(values.utilization),
            allocation:parseInt(values.allocation)
           
        }
        console.log(data);

       

        instance.post('/Resource_Allocation/', data)
            .then((response) => {
                console.log(response);
                swal("Good job!", "Record inserted successfully!", {
                    button:false,
                    timer:2000,
                    icon:"success"
                });
                props.addInput(data)
                
            }, (error) => {
                console.log(error);
            });


        setValues(initialInputs);
    }
    }
//  console.log(props);
 
    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee To Project</DialogTitle>
                <form onSubmit={handleSubmit}>

                    <DialogContent>

                       
                        <Autocomplete
                            id="Select Employee"
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
                            renderInput={params => <TextField {...params} required={true} label="Select Employee" variant="outlined" />}
                        />
                        <br/>
{/* roles autocomplete                         */}
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
                            renderInput={params => <TextField {...params} required={true} label="Select Role for Employee" variant="outlined" />}
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
                            renderInput={params => <TextField {...params} required={true} label="Select Technology" variant="outlined" />}
                        />

{/* allocation status 3 values DropDown */}
                                
                        <DropDown
                            id="allocation_status"
                            label="Select Allocation Status"
                            defaultValue=""
                            required={true}
                             className={classes.dropDown}
                            handleChange={handleChange}
                            data={status}
                            onChange={handleChange("allocation_status")}
                             
                            
                        />
{/* Allocation percentage no */}
                        <TextField
                            id="outlined-name"
                            label="Enter Allocation Percentage"
                            defaultValue=""
                            
                            className={classes.textField}
                            required={true}
                             onChange={handleChange("allocation")}
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft:5}}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />
{/* Utilization percentage no */}
                        <TextField
                            id="outlined-name"
                            label="Enter Utilization Percentage"
                            defaultValue=""
                            required={true}
                            className={classes.textField}
                          
                             onChange={handleChange("utilization")}
                            margin="normal"
                            variant="outlined"
                            style={{marginLeft:5}}
                        />




                    </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={()=>props.handleClose}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default AddEmpToProject;
