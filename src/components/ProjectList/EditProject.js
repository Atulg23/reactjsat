import React, { useState,useEffect } from 'react';
import { createStyles, fade, Theme, withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUIDataTable from "mui-datatables";
import { Button, Paper, TextareaAutosize,TextField } from '@material-ui/core';
import Done from "@material-ui/icons/Done";
// import FileUplaod from './../../common/FileUpload/FileUpload'
import DropDown from '../../common/DropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DropzoneArea } from 'material-ui-dropzone'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon  from '@material-ui/icons/Delete';
import instance from './../../common/instance';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: theme.typography.fontWeightMedium,
        background: "rgb(127,127,127)",
        // height:"100px"   

    },
    button: {
        marginTop: 20,
        background: "linear-gradient(160deg,#da303e,#e23341,#eb3644,#f43947,#e94c51,#ca6460,#a8736f,#7f7f7f)",
        //marginLeft:"30px",
    },
    grid: {
        marginTop: 0,
    },
    chip: {
        justifyContent: 'center',
        margin: theme.spacing(0.5),
    },
    paper: {
        display: 'flex',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,

    },
    input: {
        width: "60",
        textAlign: "center",
        padding: "10px",
        marginLeft: "10px"
        // borderRadius:"25px",

    },
    DropzoneArea: {                
        fontWeight: 10,
        margin:0,
        padding:0,
        minHeight:"50px"                
    },
    textArea: {
        // width: "150",
        //textAlign: "center",
        resize: 'none',
        //resize: 'vertical',
        padding: "10px",
        // marginLeft: "110px"
        border: "1px solid #888",
        overflow: "auto",
        outlineColor: "black",
        boxShadow: "none",

    },

    cssOutlinedInput: {
        "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
            //borderColor: "red" //default      
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: "black" //hovered
        },
        "&$cssFocused $notchedOutline": {
            borderColor: "black" //focused
        }
    },
    notchedOutline: {},
    cssFocused: {},
    error: {},
    disabled: {}


}));

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableHeadCell: {
            root: {
                backgroundColor: "#FFF",
                //  display: table-cell,
                fontWeight: "bold",
                marginLeft: '10px',

            }
        },
        MuiTableCell: {
            root: {
                // marginLeft: "50px",
                //backgroundColor: "#FFF",
                //  display: "table-cell",
                padding: "2px"
            }
        },
        



        // MUIDataTableDivider: {
        //   root: {
        //     backgroundColor: "#1D252D",
        //     color: "rgb(255, 255, 255)"
        //   }
        // }
        // MUIDataTableToolbar: {
        //     root: {
        //       backgroundColor: "#1D252D",
        //       color: "rgb(255, 255, 255)"
        //     }
        //   }
        // MuiDataTableHeadCell: {
        //   root: {
        //     backgroundColor: "red",
        //   //  display: table-cell,
        //     // padding:"7px"
        //   }
        // }
    }
})
//Dropdown Data
//For Status


const Options = ['Option 1', 'Option 2'];
const Status = [
    {
        id:"Active",
        status:"Active"
    } ,
    {
        id:"onHold",
        status:"onHold"
    } ,
    {
        id:"Inactive",
        status:"Inactive"
    } 
]
const sez_unit =[
    {
        id:"Unit 1",
        sez_unit:"Unit 1"
    },
    {
        id:"Unit 2",
        sez_unit:"Unit 2"
    }  
]
const project_type = [
   {
       id:"T&M",
       project_type:"T&M"
   } ,
   {
    id:"FP",
    project_type:"FP"
} 
]

const project_category = [
    {
        id:"Product Engineering",
        project_category:"Product Engineering",
    } ,
    {
        id:"Data Services",
        project_category:"Data Services",
    } ,
    {
        id:"Consulting",
        project_category:"Consulting",
    } ,
    {
        id:"Maintenance & Support",
        project_category:"Maintenance & Support",
    } ,
    
]


const EditProject = (props) => {
    console.log(props)
    // height of the TextField
    const height = 10
  
    const sowColumns = [

        {
            label: "Id",
            name: "id",
            options: {
                display: false,
                sortDirection: 'asc'
            }
        },
        {
            label: "Resource Name",
            name: "resource_name",
            options: {
                sort: false
            }
        },

        {
            label: "Role",
            name: "role",
            options: {
                sort: false
            }

        },
        {
            label: "Billiability(%)",
            name: "billability",
            options: {
                sort: false
            }
        },
        {
            label: "Rate(USD)",
            name: "rate",
            options: {
                sort: false
            }
        },
        {
            label: "Resource Start Date",
            name: "resource_start_date",
            options: {
                sort: false
            }
        },
        {
            label: "Resource End Date",
            name: "resource_end_date",
            options: {
                sort: false
            }
        },
        {
            label: "", 
            options: {
                alignItems: 'center',
                filter: false,
                sort: false,
                empty: true,
              
                customBodyRender: (value, tableMeta, updateValue) => {
                  //  const rowId = tableMeta.rowData;
                    return (
                       
                        <div>
                           {/* <IconButton>
                                <VisibilityIcon color="primary"/>
                            </IconButton> */}
                            <IconButton  >
                                <EditIcon/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            </div>
                    )
                }
            },
        }

    ];

    const milestoneColumns = [

        {
            label: "Id",
            name: "id",
            options: {
                display: false,
                sortDirection: 'asc'
            }
        },
        {
            label: "Milestone Name",
            name: "milestone_name",
            options: {
                sort: false
            }
        },

        {
            label: "Milestone Details",
            name: "milestone_details",
            options: {
                sort: false
            }

        },
        {
            label: "Amount",
            name: "amount",
            options: {
                sort: false
            }
        }, 
        {
            label: "", 
            options: {
                alignItems: 'center',
                filter: false,
                sort: false,
                empty: true,
              
                customBodyRender: (value, tableMeta, updateValue) => {
                  //  const rowId = tableMeta.rowData;
                    return (
                       
                        <div>
                           {/* <IconButton>
                                <VisibilityIcon color="primary"/>
                            </IconButton> */}
                            <IconButton  >
                                <EditIcon/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            </div>
                    )
                }
            },
        }

    ];

    const options = {
        selectableRows: false,   //no checkbox
        //filterType: "dropdown",  //filter on columns
        // responsive: "scroll",    //scrollbar
        pagination: false,
        viewColumns: false,
        download: false,
        print: false,
        search: false,
        filter: false,
        elevation: 0
    };

    const classes = useStyles();

    const [values, setValues] = useState([]);


//for Fetching data    
const[du, setDu]=useState([]);
const[customer, setCustomer]=useState([]);
const[employee, setEmployee]=useState([]);
const[projects,setProjects] = useState([]);
const[duhead, setDuhead]=useState([]);
const [szunit, setSezunit] = useState([]);

    let duData = [];
    let duheadData=[];
    let customerData = [];
    let employeeData = [];
    let projectData = [];
    let sezunitData = [];
    let resourceRecords=[];
    let milestoneRecords = [];


    // For Setting Values
    const[cname, setCname] = useState([]);
    const[duname,setDuname] = useState([]);
    const[pManager,setPManager]= useState([]);
    const[pType,setPType]= useState([]);
    const[sezunit, setsezUnit] = useState([]);
    const[pCategory,setPCategory]= useState([]);
    const[status,setStatus]=useState([]);


    useEffect(() => {
      //  console.log("Getting users");

    //For Delivery Unit       
            instance.get(`/delivery_unit/`)
            .then(response => { 
                console.log(response.data)
               // setdudata(response.data);
                for (const key in response.data) {
                    duData.push({
                        id: response.data[key].du_id,
                        du_name: response.data[key].du_name,
                       
                        
                   })
                   duheadData.push({
                    du_head:response.data[key].employees[0].display_name
                    
               })
                   
                  }
                 setDu(duData);
                 setDuhead(duheadData);
                
            })
            .catch(error=>{console.log(error)})

                        //For SEZ unit      
            instance.get('/sez_units/')
            .then(response => {
                console.log(response)
                for (const key in response.data) {
                    sezunitData.push({
                        id: response.data[key].sez_unit_id,
                        name: response.data[key].sez_unit_name,
                            
                })
                }
                setSezunit(sezunitData)
            })
            .catch(error=>{console.log(error)})
            
          
            //For customers      
            instance.get('/customers/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    customerData.push({
                        //id: response.data[key].id,
                        customer_name: response.data[key].company_name,
                       
                    })
                }
                setCustomer(customerData)
                
            })
            .catch(error=>{console.log(error)})

             //For Employees     
             instance.get('/employees/')
             .then(response => {
                 console.log(response)
                 for (const key in response.data) {
                    employeeData.push({
                         id: response.data[key].id,
                         project_manager: response.data[key].display_name,
                        
                     })
                 }
                 setEmployee(employeeData);
                                  
             })
             .catch(error=>{console.log(error)})

             instance.get(`/projects/${props.location.state.pid}`)
             .then(response => {
                 console.log(response.data)
                 for (const key in response.data) {
                    projectData.push({
                        // id: response.data.id,
                        du_head:response.data.delivery_units[0].employees[0].display_name,
                        company_name: response.data.customer[0].company_name,
                        project_start_date: response.data.project_start_date.slice(0,10),
                        project_end_date:response.data.project_end_date,
                        project_name: response.data.project_name,
                        description: response.data.description,
                        sez_unit:response.data.sez_unit,
                        project_manager:response.data.employees[0].display_name,
                        project_type: response.data.project_type_id,
                        status:response.data.status,
                        sow_start_date:response.data.sow_start_date.slice(0,10),
                        sow_end_date:response.data.sow_end_date.slice(0,10),
                        du_name:response.data.delivery_units[0].name,
                        project_category:response.data.project_category    
                     })
                    //  let sDate=response.data.project_start_date.slice(0,10);
                    //  setStartDate(sDate);
                 }
                 setCname(projectData[0]);
                 setDuname(projectData[0]);
                 setDuhead(projectData[0]);
                 setPManager(projectData[0]);
                 setPType(projectData[0]);
                 setsezUnit(projectData[0]);
                 setPCategory(projectData[0]);
                 setStatus(projectData[0]);
                 setValues(projectData[0]);
             })
             .catch(error=>{console.log(error)})

            //  instance.get(`/projects/billable_resource/${props.location.state.pid}`)
            //  .then(response => {
            //      console.log(response.data)
            //     //  for (const key in response.data) {
            //     //     resourceRecords.push({
            //     //         ru_name:response.data.resource_name,
            //     //         roles : response.data.roles[0].role_title,
            //     //         ru_start_date: response.data.resource_start_date.slice(0,10),
            //     //         ru_end_date: response.data.resource_end_date.slice(0,10)
                        
            //     //      })
                 
            //     //  }
            //      //setValues(projectData[0]);
                 
            //  })
            //  .catch(error=>{console.log(error)})


             
            //  instance.get(`http://172.27.172.61:9300/api/projects/project_milestone/${props.location.state.pid}`)
            //  .then(response => {
            //      console.log(response.data)
            //      for (const key in response.data) {
            //         milestoneRecords.push({
            //            milestone_name : response.data.milestone_name,
            //            milestone_details : response.data.milestone_details,
            //            amount: response.data.amount
                        
            //          })
                 
            //      }
            //      //setValues(projectData[0]);
                 
            //  })
            //  .catch(error=>{console.log(error)})

    }, [])
       
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const [files, setfiles] =useState([]);

    const handleChange1 = (file) => {
       // console.log("hi1");
        
        // setValues({ ...values, [name]: event.target.value });
        setfiles(file);
    };
   
   //_________________________________________________________________________________________________________
   
   
   
   let data=[];
       const [datalist,setdatalist]=useState([]);
       const addResource =() =>{
           //console.log("add");
           document.getElementById("resource-form").reset();
        //    console.log(data);
        //    console.log(data.length);
           
           const data1 = {
                           resource_name:values.resource_name,
                           role:values.role,
                           billability:values.billability,
                           start_date:values.start_date,
                           end_date:values.end_date,
                           rate:values.rate
                       };
   
             
             data.push(data1)          
           
           if(datalist.length>0){
             //  console.log("not empty data");
               setdatalist([...datalist,data[0]])
           }
               
           else{
             //  console.log("empty data");
               setdatalist(data)
           }
           
          // console.log(datalist.slice());
           
           
           // setdatalist(data)
   
          // console.log(datalist);
}
   



   //For AutoPopulate DU head


// useEffect(() => {
//     if(values.dulist){
//         //console.log("call API");
//         instance.get(`/employees/${values.dulist.du_dd}`)
//         .then(response => {
//            // console.log(response)
//             // console.log(response.data.employees[0].display_name);
//             setDuhead(response.data.display_name)
//            // setduname(response.data.delivery_units[0].name)
//             // for (const key in response.data) {
//             //     mgrnamelist.push({
//             //         m: response.data[key].project[0].id,
//             //     })
//             // }
//         //    setassignedProjectList(assignedprojlist);
//         })
//         .catch(error => { console.log(error) })
//       //  console.log(duhead);
//     }
        
// },[])

//console.log(values.customer_name)
   //_________________________________________________________________________________________________________
   
   //_________________________________________________________________________________________________________
   const [milestoneList, setMileStonesList] = useState([]);
   let milestoneData=[];
   
   const addMilestone=() =>{
       console.log("add");
       document.getElementById("milestone-form").reset();
       console.log(data);
       console.log(data.length);
       
       const data1 = {
                       milestone_name:values.milestone_name,
                       amount:values.amount,
                       milestone_details:values.milestone_details,
                       
                   };
   
         
                   milestoneData.push(data1)          
       
       if(milestoneList.length>0){
           console.log("not empty data");
           setdatalist([...milestoneList,milestoneData[0]])
       }
           
       else{
           console.log("empty data");
           setMileStonesList(milestoneData)
       }
       
      // console.log(milestoneList.slice());
       
       
       // setdatalist(data)
   
     //  console.log(milestoneList);
       
       
   }


let check;
if(values.project_type ){
    check = values.project_type;
   // console.log(check);
}
const handleClose=()=>{
    props.history.push('/projectlist');
}
const [project_milestone,setproject_milestone]=useState([{milestone_name:"",milestone_details:"",amount:0}])

// const[value, setValue] =useState();
// console.log(value)
const [inputCname, setInputCname] = useState('')
//console.log(inputCname)
const [inputDuname, setInputDuname] = useState('')
//console.log(inputDuname)
const [inputPManager, setInputPManager] = useState('')
const [inputType, setInputType] = useState('')
const [inputSezUnit, setInputSezUnit] = useState('')
const [inputPCategory, setInputPCategory] = useState('')
const[inputStatus,setInputStatus] = useState('');
const[inputDesc,setInputDesc] = useState('');
   //_________________________________________________________________________________________________________
   
// console.log(customer);
console.log(values);
console.log(project_milestone);


    return (
        <div className="mainContent">
             <form  >
            <div className={classes.root}>
           
                <ExpansionPanel
                    style={{height:"500px"}}
                    defaultExpanded
                >
                    <ExpansionPanelSummary
                        
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.heading}
                    >
                        <Typography ><b>Project Details</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <div style={{ marginTop: "10px", }}>
                            <div style={{ display: "inline-flex" }}>   
                    
                            <Autocomplete
                           
                            id="Customer Name"
                            options={customer}
                            value={cname}
                            getOptionLabel={customer => customer.company_name}
                        
                            onChange={(event, newValue) => {
                            setCname(newValue);
                           // setInputValue(newValue);
                            }}
                            inputCname={inputCname}
                            onInputChange={(event, newInputValue) => {
                            setInputCname(newInputValue);
                            //setValue(newInputValue)
                            
                            }}
                          
                             size="small"
                            renderOption={option => (
                                <React.Fragment>
                                    {option.customer_name}
                                </React.Fragment>
                            )}
                            style={{width:"220px",marginTop:"16px",marginLeft:"10px"}}
                            renderInput={params => <TextField {...params} label="Customer Name" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                        />

                                
                        <Autocomplete
                           
                           id="DU"
                           options={du}
                           value={duname}
                          
                           getOptionLabel={option => option.du_name}
                           onChange={(event, newValue) => {
                           setDuname(newValue);
                           }}
                            inputDuname={inputDuname}
                           onInputChange={(event, newInputValue) => {
                           setInputDuname(newInputValue);
                           }}
                         
                            size="small"
                           renderOption={option => (
                               <React.Fragment>
                                   {option.du_name}
                               </React.Fragment>
                           )}
                           style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                           renderInput={params => <TextField {...params} label="DU" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                       />
                        

                                <TextField
                                    label="DU Head"
                                    id="du_head"
                                    size="small"
                                    value={  du.du_head ? duname.du_head :duhead.du_head}
                                    // getOptionLabel={option => option.du_head}
                                    onChange={handleChange("du_head")}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginLeft: "30px",width:"220px" }}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                />
                 <Autocomplete
                           
                           id="Project Manager"
                           options={employee}
                           value={pManager}
                          
                           getOptionLabel={option => option.project_manager}
                           onChange={(event, newValue) => {
                           setPManager(newValue);
                           }}
                           inputPManager={inputPManager}
                           onInputChange={(event, newInputValue) => {
                           setInputPManager(newInputValue);
                           }}
                         
                            size="small"
                           renderOption={option => (
                               <React.Fragment>
                                   {option.project_manager}
                               </React.Fragment>
                           )}
                           style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                           renderInput={params => <TextField {...params} label="Project Manager" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                       />
                                
                            </div>
                            <div style={{ display: "inline-flex" }}>
                            <TextField
                                    label="Project Name"
                                    required={true}
                                    size="small"
                                    id="project_name"
                                    value={pManager.project_name}
                                    onChange={handleChange("project_name")}
                                    InputProps={{
                                        classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                        },
                                    }}
                                    style={{marginLeft: "10px",width:"220px" }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"
                                />
                    <Autocomplete   
                           id="Project Type"
                           options={project_type}
                           value={pType}
                          
                           getOptionLabel={option => option.project_type}
                           onChange={(event, newValue) => {
                           setValues(newValue);
                           }}
                          inputType={inputType}
                           onInputChange={(event, newInputValue) => {
                           setInputType(newInputValue);
                           }}
                         
                            size="small"
                        //    renderOption={option => (
                        //        <React.Fragment>
                        //            {option.project_type}
                        //        </React.Fragment>
                        //    )}
                           style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                           renderInput={params => <TextField {...params} label="Project Type" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                       />

                                <Autocomplete
                           
                                id="SEZ Unit"
                                options={sez_unit}
                                value={sezunit}
                            
                                getOptionLabel={option => option.sez_unit}
                               onChange={(event, newValue) => {
                               setsezUnit(newValue);
                               }}
                               inputSezUnit={inputSezUnit}
                               onInputChange={(event, newInputValue) => {
                               setInputSezUnit(newInputValue);
                               }}
                         
                            size="small"
                           renderOption={option => (
                               <React.Fragment>
                                   {option.sez_unit}
                               </React.Fragment>
                           )}
                           style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                           renderInput={params => <TextField {...params} label="SEZ Unit" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                       />

                                <Autocomplete
                                    size="small"
                                    id="project_category"
                                    options={project_category}
                                    value={pCategory}
                          
                                    getOptionLabel={option => option.project_category}
                                    onChange={(event, newValue) => {
                                    setPCategory(newValue);
                                    }}
                                    inputPCategory={inputPCategory}
                                    onInputChange={(event, newInputValue) => {
                                    setInputPCategory(newInputValue);
                                    }}
                                    renderOption={option => (
                                        <React.Fragment>
                                            {option.project_category}
                                        </React.Fragment>
                                    )}
                                    style={{ marginLeft: "30px", width: "220px" }}
                                    renderInput={params => <TextField {...params} 
                                        label="Project Category"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />


                                
                            </div>


                            <div style={{ display: "inline-flex" }}>
                            <TextField
                                    label="Project Start Date"
                                    required={true}
                                    value={props.location.state.project_startDate}
                                    
                                    id="project_start_date"
                                    size="small"
                                    onChange={handleChange("project_start_date")}
                                    InputLabelProps={{ shrink: true }}
                                    style={{width: "220px",marginLeft:"10px" }}
                                    type="date"
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Project End Date"
                                   
                                    id="project_end_date"
                                    size="small"
                                    value={props.location.state.project_endDate}
                                    
                                    onChange={handleChange("project_end_date")}
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{marginLeft: "30px",width: "220px" }}
                                    type="date"
                                    margin="normal"
                                    variant="outlined"
                                />                            
                                <TextField
                                    label="SOW Start Date"
                                    required={true}
                                    size="small"
                                    id="sow_start_date"
                                    value={props.location.state.sow_startDate}
                                    
                                    onChange={handleChange("sow_start_date")}
                                    // inputProps={{
                                    // style: {
                                    //     height,
                                    //     padding: '14px 10.5px',
                                    //     },
                                    // }}
                                    // InputLabelProps={{
                                    //         classes: {
                                    //         root: classes.cssLabel,
                                    //         focused: classes.cssFocused,
                                    //         height,
                                    //     padding: '14px 10.5px',
                                    //         },
                                    //     }}
                                    //     InputProps={{
                                    //         classes: {
                                    //         root: classes.cssOutlinedInput,
                                    //         focused: classes.cssFocused,
                                    //         notchedOutline: classes.notchedOutline,
                                    //         },
                                    //     }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{marginLeft:"30px", width: "220px" }}
                                    type="date"
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    label="SOW End Date"
                                    required={true}
                                    id="sow_end_date"
                                    size="small"
                                    value={props.location.state.sow_endDate}
                                    
                                    onChange={handleChange("sow_end_date")}
                                    // inputProps={{
                                    // style: {
                                    //     height,
                                    //     padding: '14px 10.5px',
                                    //     },
                                    // }}
                                    // InputLabelProps={{
                                    //         classes: {
                                    //         root: classes.cssLabel,
                                    //         focused: classes.cssFocused,
                                    //         height,
                                    //     padding: '14px 10.5px',
                                    //         },
                                    //     }}
                                    //     InputProps={{
                                    //         classes: {
                                    //         root: classes.cssOutlinedInput,
                                    //         focused: classes.cssFocused,
                                    //         notchedOutline: classes.notchedOutline,
                                    //         },
                                    //     }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginLeft: "30px", width: "220px" }}
                                    type="date"
                                    
                                    margin="normal"
                                    variant="outlined"
                                />
                                
                               

                            </div>
                            <div>
                            <Autocomplete
                                    size="small"
                                    id="project_category"
                                    options={Status} 
                                    value={status}
                          
                                    getOptionLabel={option => option.status}
                                    onChange={(event, newValue) => {
                                    setStatus(newValue);
                                    }}
                                    inputValue={values.status}
                                    onInputChange={(event, newInputValue) => {
                                    setInputStatus(newInputValue);
                                    }}
                                    renderOption={option => (
                                        <React.Fragment>
                                            {option.status}
                                        </React.Fragment>
                                    )}
                                    style={{ marginLeft: "10px", width: "220px" }}
                                    renderInput={params => <TextField {...params} 
                                        label="Status"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                        required={true}
                                    />}
                                />


                            </div>

                            
                                <TextField
                                    multiline={true}
                                    rows={3}
                                    rowsMax={5}
                                    value={values.description}
                                    label="Description"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange("description")}
                                    //className={classes.textArea}
                                    style={{ width: "720px",height:"50px",marginLeft:"10px" }}
                                    size="20px"
                                    id="description"
                                    //aria-label="maximum height"
                                    margin="normal"
                                    variant="outlined"
                                    required={true}

                                />

                          

                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
               
               { check === "T&M" ? 

               
               <ExpansionPanel
                    defaultExpanded
                    style={{marginTop:"30px"}}
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography ><b>Billable Resources as per SOW</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Paper elevation={0}>
                        <div >
                        <form id="resource-form" >
                        <div style={{height:"50%"}}>
                            <div >
                            <TextField
                                    size="small"
                                    style={{ width: "200px" }}
                                    required
                                    label="Resource Name"
                                    id="resource_name"
                                    onChange={handleChange("resource_name")}
                                    InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"

                                />

                                <TextField
                                    style={{ width: "150px", marginLeft: "20px" }}
                                    label="Role"
                                    id="role"
                                    size="small"
                                   
                                    onChange={handleChange("role")}
                                    
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"
                                />
                                    <TextField
                                    label="Start Date"
                                   
                                    size="small"
                                    id="start_date"
                                    onChange={handleChange("start_date")}
                                    
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{marginLeft: "20px", width: "170px" }}
                                    type="date"
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    label="End Date"
                                 
                                    size="small"
                                    id="end_date"
                                    onChange={handleChange("end_date")}
                                    
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginLeft: "20px", width: "170px" }}
                                    type="date"
                                    
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Billability(%)"
                                    style={{ width: "80px", marginLeft: "30px" }}
                                    id="billability"
                                    size="small"
                                    onChange={handleChange("billability")}
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"

                                />

                                <TextField
                                    label="Rate(USD)"
                                    style={{ width: "80px", marginLeft: "30px" }}
                                    id="rate"
                                    size="small"
                                    onChange={handleChange("rate")}
                                    
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    //style={{ marginLeft: "100px" }}
                                    margin="normal"
                                    variant="outlined"

                                />


                               
                                <Button className={classes.button} style={{height:40,float:"right",marginTop:"25px"}} variant="contained" 
                                         onClick={()=>addResource()}
                                        >
                                                    ADD Resource
                                </Button> 
                            </div>
                            <br></br>
                            <div style={{marginLeft:"30px",display:"flex"}}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                        // title={"Customers"}
                                        data={datalist}
                                        columns={sowColumns}
                                         options={options}
                                    //  className={classes.root}
                                />
                                </MuiThemeProvider>
                             </div>
                        </div>

                    </form>
                            </div> 
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                : 
                   null
                   
                }
        
                {check === "FP" ?
                <ExpansionPanel
                    defaultExpanded
                    style={{marginTop:"30px"}}
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography><b>Milestone Details</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <div>
                            <div >
                            <form id="milestone-form">
                            <div style={{height:"50%"}}>
                            <div >
                            <TextField
                                    label="Milestone Name"
                                    style={{ marginLeft: "10px",width: "30%" }}
                                    id="milestone_name"
                                    size="small"
                                    // onChange={handleChange("milestone_name")}
                                    onChange={(event, newValue) => {
                                        setproject_milestone({milestone_name:event.target.value});
                                        }}
                                    InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"

                                />
                                <TextField
                                    label="Milestone Details"
                                    style={{ width: "30%", marginLeft: "30px" }}
                                    id="milestone_details"
                                    size="small"
                                    // onChange={handleChange("milestone_details")}
                                    onChange={(event) => {
                                        setproject_milestone({milestone_details:event.target.value});
                                        }}
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"

                                />

                                <TextField
                                    label="Amount"
                                    onChange={handleChange("amount")}
                                    style={{ width: "20%", marginLeft: "30px" }}
                                    id="amount"
                                    size="small"
                                    onChange={(event) => {
                                        setproject_milestone({amount:parseInt(event.target.value)});
                                        }}
                                    
                                        InputProps={{
                                            classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                            },
                                        }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="normal"
                                    variant="outlined"

                                />

                               
                                <Button className={classes.button} style={{height:40,float:"right",marginTop:"25px"}} variant="contained" 
                                         onClick={()=>addMilestone()}
                                        >
                                                    ADD MileStone
                                </Button> 
                            </div>
                            <br></br>
                            <div style={{marginLeft:"30px",display:"flex"}}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                        // title={"Customers"}
                                        data={milestoneList}
                                        columns={milestoneColumns}
                                         options={options}
                                    //  className={classes.root}
                                />
                                </MuiThemeProvider>
                             </div>
                        </div>
                                
                                </form>
                            </div>

                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                 :
                     null
                 }
                
                {/* <ExpansionPanel>
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography><b>Process & Audit</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                                        
                   </ExpansionPanelDetails>
                </ExpansionPanel> */}
                
                <ExpansionPanel
                    defaultExpanded
                    style={{marginTop:"30px"}}
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography><b>Attachments</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                                         
                          <DropzoneArea
                            id="file"
                                dropzoneText="Drag and Drop Files Here to Upload"
                                filesLimit={1000}
                                acceptedFiles={[]}
                                // showPreviews={true}
                                maxFileSize={500000000000000}
                                // showPreviewsInDropzone={false}
                                 showFileNames={true}
                                // previewText="Files"
                                // dropzoneClass={classes.DropzoneArea}
                                onChange={handleChange1.bind("file")}
                            />
                         
                          <div>
                        {/* <Button className={classes.button} variant="contained" >Add</Button> */}
                          </div>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>

            <div style={{ float: "right" }}>
                <Button className={classes.button} variant="contained" onClick={()=>handleClose()}>Cancel</Button>
                <Button className={classes.button} style={{ marginLeft: "30px" }} variant="contained" >Update</Button>
            </div>
        </form>
        </div>
    )
}

export default EditProject;