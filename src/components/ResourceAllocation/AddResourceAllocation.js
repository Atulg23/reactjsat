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
import MUIDataTable from "mui-datatables";

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
    // root:{

    // },
    container: {
        display: "flex",
        flexWrap: "wrap",
        width:"100%"
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

const projectData = [
    {
        "id":1,
        "project_name":"Project 1",
        "project_manager":"Manager 1",
        "allocation":"50",
        "role":"Tester",
        "billability_status":"Status 1",
        "billabilty_sub_status":"Sub-Status 1",
        "start_date":"10-03-2020",
        "end_date":"20-04-2020",
        "department":"P&D",
        "delivery_unit":"DU1"
    },
    // {
    //     "id":2,
    //     "project_name":"Project 2",
    //     "project_manager":"Manager 2",
    //     "allocation":"50",
    //     "role":"Developer",
    //     "billability_status":"Status 2",
    //     "billabilty_sub_status":"Sub-Status 2",
    //     "start_date":"10-03-2020",
    //     "end_date":"20-04-2020",
    //     "department":"P&D",
    //     "delivery_unit":"DU2"
    // },
    // {
    //     "id":3,
    //     "project_name":"Project 3",
    //     "project_manager":"Manager 3",
    //     "allocation":"50",
    //     "role":"Database",
    //     "billability_status":"Status 3",
    //     "billabilty_sub_status":"Sub-Status 3",
    //     "start_date":"10-03-2020",
    //     "end_date":"20-04-2020",
    //     "department":"P&D",
    //     "delivery_unit":"DU3"
    // }
]


const AddResourceAllocation = (props) => {

    const columns = [

        {
            label: "Id",
            name: "id",
            options: {
                display: false,
                sortDirection: 'asc',
                filter: false
            }
        },
        {
            label: "Project Name",
            name: "project_name",

        },
        {
            label: "Project Manager",
            name: "project_manager",

        },
        {
            label: "Allocation %",
            name: "allocation",

        },
        {
            label: "Role ",
            name: "role",

        },
        {
            label: "Billability Status",
            name: "billability_status",

        },
        {
            label: "Billability Sub-Status",
            name: "billability_sub_status",

        },
        {
            label: "Start Date ",
            name: "start_date",

        },
        {
            label: "End Date ",
            name: "end_date",

        },
        // {
        //     label: "Department ",
        //     name: "Department",

        // },
        {
            label: "Delivery Unit ",
            name: "delivery_unit",

        },
    ];

    const options = {
        filterType: "dropdown",
        // responsive: "scroll",
        download: false,
        print: false,
        selectableRows: false,
        viewColumns: false,
        filter: false,
        pagination: false,
        search:false,
        elevation:0

    };

   
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
  
    //     useEffect(()=>{
            
    //     if((props.empidlist).length){
    //         console.log("hi");
    //         for (const key in props.empidlist) {
    //                 emplist.push({
    //                     id:  props.empidlist[key].emp_id,
    //                 })
                    
    //              }
    //                 setemplistid(emplist)
    //     }
    //    else
    //    console.log("not found");
  
    //     },[props.empidlist])
        
    const classes = useStyles(0);
    const initialInputs = {  employee_id: "", tech_id: "", proj_id: "", status: "", allocation_percentage: "",utilization_percentage: ""}
   
    const [values, setValues] = React.useState(initialInputs)


     
    const [project, setProject] = useState([]);

    //projects per selected employee
    const [assignedProjectList,setassignedProjectList] = useState([]);
   
    let assignedprojlist=[];
 
   
    let projectInfo = [];
    let projects = [];
    const[list, setList] = useState([]);
    useEffect(() => {
      //for selecting projects
      console.log(props);
 
//Project Dropdownlist    
      instance.get('/projects/')
      .then(response => {
          // console.log(response.data)
          for (const key in response.data) {
              projectInfo.push({
                  id: response.data[key].id,
                  name: response.data[key].name,
                  short_name: response.data[key].short_name,
                  code: response.data[key].code,
                  customer_id: response.data[key].customer_id,
                  project_type_one: response.data[key].project_type_one,
                  project_type_two: response.data[key].project_type_two,
                  project_type_three: response.data[key].project_type_three,
              })


          }
          setProject(projectInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })

//Values in table Current Allocation
      instance.get(`/Resource_Allocation/emp/${props.employeeID}`)
      .then(response => {
           console.log(response)
          for (const key in response.data) {
              projects.push({
                  project_name: response.data[key].project[0].name,
                  proj_manager: response.data[key].proj_manager,
                  allocation: response.data[key].allocation,
                  role: response.data[key].roles[0].role_title,
                  billability_status:response.data[key].billability_status,
                  billabilty_sub_status:response.data[key].billability_sub_status,
                  start_date:response.data[key].project[0].start_date,
                  end_date:response.data[key].project[0].end_date,
                  du: response.data[key].du,

              })


          }
          setList(projects)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })

      instance.get(`/Resource_Allocation/emp/${props.employeeID}`)
      .then(response => {
          console.log(response)
          for (const key in response.data) {
              assignedprojlist.push({
                  proj_id: response.data[key].project[0].id,
              })
          }
         setassignedProjectList(assignedprojlist);
      })
      .catch(error => { console.log(error) })


    },[props])
// console.log(list);

    let projectList = [];
    list.forEach((project) => {
        const data = [];
        data.push(project.id);
        data.push(project.project_name);
        data.push(project.proj_manager);
        data.push(project.allocation);
        data.push(project.role);
        data.push(project.billability_status);
        data.push(project.billabilty_sub_status);
        data.push(project.start_date.slice(0,10));
        data.push(project.end_date.slice(0,10));
        data.push(project.department);
        data.push(project.delivery_unit);
            
        projectList.push(data);
        
    });

    // console.log(projectList);
    
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
      
        // instance.get(`/Resource_Allocation/emp/${props.employeeID}`)
        // .then(response => {
        //     console.log(response)
        //     for (const key in response.data) {
        //         assignedprojlist.push({
        //             proj_id: response.data[key].project[0].id,
        //         })
        //     }
        //    setassignedProjectList(assignedprojlist);
        // })
        // .catch(error => { console.log(error) })

        
        console.log(assignedProjectList);
        
        let valid=true;


        for(const key in assignedProjectList)
        {
            console.log(assignedProjectList[key]);
            
            if(assignedProjectList[key].proj_id===values.projectlist.id){
                console.log("in if");
                
                swal("Error", "Same Employee Already Assigned To This Project !", {
                                    // button:false,
                                    // timer:2000,
                                    icon:"warning"
                                });
                                valid=false;
                                break;
            }
        }
            if(valid){
                console.log("ITS fine");
                 let data = {
           
            emp_id: props.empID,
            tech_id: 1,
            role_id: 2,
            proj_id: values.projectlist.id,
            status:true,
            designation_id:2,
            // delivery_unit_id:values.du,
            delivery_unit_id:3,                   //auto populated
            proj_manager:values.manager_name,
            // proj_manager:values.manager_name,                    //auto populated

            reporting_manager: "Manager1",
            billability_status:values.billability_status,
            billability_sub_status:values.billability_sub_status,
            remarks:values.remarks,
            utilization:parseInt(values.actual_utilization),
            allocation:parseInt(values.allocation)

// empid,projid,role_id,tech_id,designation_id,proj_manager,utilization,allocation
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
                // props.addInput(data)
                
            }, (error) => {
                console.log(error);
            });

            }
        

    // if(emplistid){
    //     console.log("found");
    //    if((props.empidlist).length) {
    //     for(let key in props.empidlist)
    //     {
    //         console.log(emplistid[key].id);
    //         if(props.empidlist[key].emp_id==values.emplist.id){
    //             swal("Error", "Same Employee Already Assigned To This Project !", {
    //                 // button:false,
    //                 // timer:2000,
    //                 icon:"warning"
    //             });
    //             break;
    //         }
    //         else
    //         {
    //             let data = {
           
    //                 emp_id: values.emplist.id,
    //                 tech_id: values.techlist.id,
    //                 role_id: values.rolelist.id,
    //                 proj_id: props.proj_id.id,
    //                 status:values.allocation_status,
                   
    //                 utilization:parseInt(values.utilization),
    //                 allocation:parseInt(values.allocation)
                   
    //             }
    //             console.log(data);
        
               
        
    //             instance.post('/Resource_Allocation/', data)
    //                 .then((response) => {
    //                     console.log(response);
    //                     // emplistid.push({id:values.emplist.id});

    //                     swal("Good job!", "Record inserted successfully!", {
    //                         button:false,
    //                         timer:2000,
    //                         icon:"success"
    //                     });
    //                     props.addInput(data)
                        
    //                 }, (error) => {
    //                     console.log(error);
    //                 });
        
        
    //             setValues(initialInputs);
    //             // props.handleClose(false)
    //             break;
    //         }
            
    //     }}
    //     else{
    //         console.log("hi");
    //         let data = {
           
    //             emp_id: values.emplist.id,
    //             tech_id: values.techlist.id,
    //             role_id: values.rolelist.id,
    //             proj_id: props.proj_id.id,
    //             status:values.allocation_status,
               
    //             utilization:parseInt(values.utilization),
    //             allocation:parseInt(values.allocation)
               
    //         }
    //         console.log(data);
    
           
    
    //         instance.post('/Resource_Allocation/', data)
    //             .then((response) => {
    //                 console.log(response);
    //                 // emplistid.push({id:values.emplist.id});

    //                 swal("Good job!", "Record inserted successfully!", {
    //                     button:false,
    //                     timer:2000,
    //                     icon:"success"
    //                 });
    //                 props.addInput(data)
                    
    //             }, (error) => {
    //                 console.log(error);
    //             });
    
    
    //         setValues(initialInputs);
    //         props.handleClose(false)
    //        break;
    //     }
        
        
    // }
    // else{
        // console.log("in else");
        
        // let data = {
           
        //     emp_id: props.empID,
        //     tech_id: 1,
        //     role_id: 2,
        //     proj_id: values.projectlist.id,
        //     status:true,
        //     designation_id:2,
        //     // delivery_unit_id:values.du,
        //     delivery_unit_id:3,                   //auto populated
        //     proj_manager:values.manager_name,
        //     // proj_manager:values.manager_name,                    //auto populated

        //     reporting_manager: "Manager1",
        //     billability_status:values.billability_status,
        //     billability_sub_status:values.billability_sub_status,
        //     remarks:values.remarks,
        //     utilization:parseInt(values.actual_utilization),
        //     allocation:parseInt(values.allocation)

//empid,projid,role_id,tech_id,designation_id,proj_manager,utilization,allocation
        // }
        // console.log(data);

       

        // instance.post('/Resource_Allocation/', data)
        //     .then((response) => {
        //         console.log(response);
        //         swal("Good job!", "Record inserted successfully!", {
        //             button:false,
        //             timer:2000,
        //             icon:"success"
        //         });
        //         // props.addInput(data)
                
        //     }, (error) => {
        //         console.log(error);
        //     });


        // setValues(initialInputs);
    // }
    }
//  console.log(props);
// console.log(assignedProjectList);

// const check = () =>{
//     console.log("in check");
//     console.log(assignedProjectList);
    
//     for(const key in assignedProjectList)
//     {
//         console.log(assignedProjectList[key]);
        
//         if(assignedProjectList[key].proj_id===values.projectlist.id){
//             console.log("in if");
            
//             swal("Error", "Same Employee Already Assigned To This Project !", {
//                                 // button:false,
//                                 // timer:2000,
//                                 icon:"warning"
//                             });
//                             break;
//         }
//         else{
//             console.log("ITS fine");
            
//         }
//     }
    
// }
 let str="2020-04-21";
 
 
    return (
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth = "xl"
                >
                <DialogTitle id="form-dialog-title">Current Allocation</DialogTitle>
                <MUIDataTable 
                            
                            // title={"Current Allocation"}
                            data={projectList}
                            columns={columns}
                            options={options}
                        />

                {/* <DialogTitle id="form-dialog-title">Add Project</DialogTitle> */}

                

                <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">New Allocation</DialogTitle>
                    <DialogContent>
                    {/* <div style={{display:"inline-flex"}}>
                        <label style={{marginLeft:"45px"}}> Project Name</label>
                        <label style={{marginLeft:"220px"}}>Project Manager</label>
                        <label style={{marginLeft:"175px"}}>Delivery Unit</label>
                        <label style={{marginLeft:"210px"}}>From Date:</label>
                        <label style={{marginLeft:"210px"}}>End Date:</label>
                    </div> */}
                    {/* <hr></hr> */}
                    <div style={{display:"inline-flex"}}>
                        <Autocomplete
                            id="Project Name list"
                            options={project}
                            //defaultValue={values.}
                            
                            getOptionLabel={option => option.name}
                            onChange={(event, projectlist) => {
                                setValues({ ...values, projectlist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    {option.name}
                                    {/* <b>{option.id}</b>&emsp;{option.name} */}
                                </React.Fragment>
                            )}
                            style={{ width: 200,marginTop:"16px"}}
                            renderInput={params => <TextField {...params} label="Select Project" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                        />
                        
                        <TextField
                            id="outlined-name"
                            label="Manager Name"
                            // defaultValue="Manager Name....."
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("manager_name")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />
                       
                        <TextField
                            id="outlined-name"
                            label="Delivery Unit"
                            // defaultValue="DU...."
                            InputLabelProps={{ shrink: true }}
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("du")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />

                    
                        <TextField
                            id="outlined-name"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            className={classes.textField}
                            value={values.start_date}
                            
                            onChange={handleChange("start_date")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                        />
                        
                        <TextField
                            id="outlined-name"
                            label="End Date"
                            // defaultValue="04/03/2020"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{ shrink: true }}
                           // defaultValue="2020-04-22"
                            // inputProps={{ min:str, max: "2020-04-24" }}
                            inputProps={{ min:values.start_date }}
                            // min="2020-04-21"
                            // max="2020-04-24"
                            onChange={handleChange("end_date")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                        />
        
                    </div>
                    {/* <br></br><br></br><br></br>
                    <div style={{display:"inline-flex"}}>
                        <label style={{marginLeft:"45px"}}>Allocation %</label>
                        <label style={{marginLeft:"220px"}}>*Fore-casted Utilization</label>
                        <label style={{marginLeft:"140px"}}>*Actual Utilization</label>
                        <label style={{marginLeft:"180px"}}>*Billability Status</label>
                        <label style={{marginLeft:"150px"}}>*Billability Sub-Status</label>
                    </div> */}
                    <br></br>
                    <div style={{display:"inline-flex"}}>
                    <TextField
                            id="outlined-name"
                            label="Billability Status"
                            InputLabelProps={{ shrink: true }}                            
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("billability_status")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200}}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />
                         <TextField
                            id="outlined-name"
                            label="Billability Sub-Status"
                            InputLabelProps={{ shrink: true }}                            
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("billability_sub_status")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                            // }}
                        />
                    <TextField
                            id="outlined-name"
                            label="Biiling Percentage"
                            InputLabelProps={{ shrink: true }}
                            // inputProps={{ max:100 }}
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("allocation")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value)<101?parseInt(e.target.value):null ).toString().slice(0,3)
                            }}
                        />
                    <TextField
                            id="outlined-name"
                            label="Forecasted Utilization"
                            InputLabelProps={{ shrink: true }}
                            
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("forecasted_utilization")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value)<101?parseInt(e.target.value):null ).toString().slice(0,3)
                            }}
                        />
                    <TextField
                            id="outlined-name"
                            label="Actual Utilization"
                            InputLabelProps={{ shrink: true }}                            
                            className={classes.textField}
                            // required={true}
                             onChange={handleChange("actual_utilization")}
                            margin="normal"
                            variant="outlined"
                            style={{width:200,marginLeft:"35px"}}
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value)<101?parseInt(e.target.value):null ).toString().slice(0,3)
                            }}
                        />
                        
                       
                       
                     </div>
                     <br></br>
                     <div style={{display:"inline-flex",width:"91%"}}>
                            <label style={{marginLeft:"45px",marginTop:"30px"}}>Remarks </label>
                            <TextField
                                id="outlined-name"
                                label="Remarks"
                                defaultValue=""
                                className={classes.textField}
                                // required={true}
                                 onChange={handleChange("remarks")}
                                margin="normal"
                                variant="outlined"
                                style={{ marginLeft:"130px"}}
                                // onInput = {(e) =>{
                                //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                // }}
                            /> 
                    </div>
                      

                        
                     

{/* allocation status 3 values DropDown */}
                                
                        {/* <DropDown
                            id="allocation_status"
                            label="Select Allocation Status"
                            defaultValue=""
                            required={true}
                             className={classes.dropDown}
                            handleChange={handleChange}
                            data={status}
                            onChange={handleChange("allocation_status")}
                             
                            
                        /> */}

                     



                    </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={()=>props.handleClose}>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
    );
};

export default AddResourceAllocation;
