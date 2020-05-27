import React, { useState,useEffect } from 'react';
import { createStyles, fade, Theme, withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUIDataTable from "mui-datatables";
import { Button, Paper, TextareaAutosize,TextField,Tooltip } from '@material-ui/core';
import Done from "@material-ui/icons/Done";
// import FileUplaod from './../../common/FileUpload/FileUpload'
import DropDown from '../../common/DropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DropzoneArea } from 'material-ui-dropzone'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon  from '@material-ui/icons/Delete';
import instance from './../../common/instance';
import  swal  from 'sweetalert';
import { set } from 'date-fns';

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
        minHeight:"50px",

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
                marginLeft: '20px',

            }
        },
        MuiTableCell: {
            root: {
                // marginLeft: "50px",
                //backgroundColor: "#FFF",
                //  display: "table-cell",
                padding: "8px"
            }
        },
       

        MuiTextField:{
            root:{
                height:"50px"
            }
        }
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
const status = [
    "Active",
    "onHold",
    "Inactive"
]
const sez_unit =[
    "Unit 1",      
    "Unit 2",
]
const project_type = [
    "T&M",
    "FP" ,
    "Internal" 
]

const project_category = [
    "Product Engineering",
    "Professional Services",
    "Data Services",
    "Consulting",
    "Maintenance & Support",
]


const AddProject = (props) => {
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
            label: "Start Date",
            name: "start_date",
            options: {
                sort: false
            }
        },
        {
            label: "End Date",
            name: "end_date",
            options: {
                sort: false
            }
        },
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
    // const initialInputs = {project_name:"",du_id:"",customer_id:"",project_manager:"",project_type:"",sezunit:"",project_start_date:"",
    //                         project_end_date:"",sow_start_date:"",sow_start_date:"",project_category:"",status:"",description:"",billable_resource:[],
    //                         project_milestone:[],attachment:[],is_active:true}

    const [values, setValues] = useState([]);
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
       
    };





let check;
if(values.projectType ){
    check = values.projectType.name;
    console.log(check);
}

const[du, setDu]=useState([]);
const[customer, setCustomer]=useState([]);
const[employee, setEmployee]=useState([]);
const[dudata,setdudata] = useState([])
const [ptype, setPtype] = useState([]);
const [szunit, setSezunit] = useState([]);
    let duData = [];
    let customerData = [];
    let employeeData = [];
    let ptypeData = [];
    let sezunitData = [];

    useEffect(() => {
      //  console.log("Getting users");

    //For Project type      
    instance.get('/project_types/')
    .then(response => {
        console.log(response)
        for (const key in response.data) {
            ptypeData.push({
                id: response.data[key].pro_type_id,
                name: response.data[key].project_type_name,
                      
           })
        }
         setPtype(ptypeData)
     })
    .catch(error=>{console.log(error)})
    
  console.log("Ptype data", ptypeData)
    
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
    
   console.log("SZunit data", sezunitData)


    //For Delivery Unit      
            instance.get('/delivery_unit/')
            .then(response => {
                //console.log(response)
                setdudata(response.data);
                for (const key in response.data) {
                    duData.push({
                        id: response.data[key].du_id,
                        name: response.data[key].du_name,
                        du_dd:response.data[key].delivery_director,
                       
                   })
                }
                 setDu(duData)
               
            })
            .catch(error=>{console.log(error)})

            //For customers      
            instance.get('/customers/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    customerData.push({
                        id: response.data[key].customer_id,
                        name: response.data[key].company_name,
                       
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
                         display_name: response.data[key].display_name,
                       
                     })
                 }
                 setEmployee(employeeData);
                 
             })
             .catch(error=>{console.log(error)})

    }, [])

 //  console.log(employee);
//For AutoPopulate DU head

const[duhead, setDuhead]=useState();
useEffect(() => {
    if(values.dulist){
        console.log("call API");
        let mgrnamelist=[];
        let dunamelist=[];
        instance.get(`/employees/${values.dulist.du_dd}`)
        .then(response => {
            console.log(response)
            // console.log(response.data.employees[0].display_name);
            setDuhead(response.data.display_name)
           // setduname(response.data.delivery_units[0].name)
            // for (const key in response.data) {
            //     mgrnamelist.push({
            //         m: response.data[key].project[0].id,
            //     })
            // }
        //    setassignedProjectList(assignedprojlist);
        })
        .catch(error => { console.log(error) })
        console.log(duhead);
    }
       
})


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
        console.log("add");
        document.getElementById("resource-form").reset();
        console.log(data);
        console.log(data.length);
       
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
            console.log("not empty data");
            setdatalist([...datalist,data[0]])
        }
           
        else{
            console.log("empty data");
            setdatalist(data)
        }
       
        console.log(datalist.slice());
       
       
        // setdatalist(data)

        console.log(datalist);
       
       
    }




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
   
    console.log(milestoneList.slice());
   
   
    // setdatalist(data)

    console.log(milestoneList);
   
   
}

//_________________________________________________________________________________________________________

console.log(props)

const handleSubmit = () => {
   console.log(values);
   let filename=[];
   for (let i = 0; i <files.length; i++) {
       filename.push(files[i].name)
       
   }
   let billability=[]
   for (let i = 0; i < datalist.length; i++) {
    billability.push(datalist[i])
       
   }
   let milestone=[]
   for (let i = 0; i < milestoneList.length; i++) {
    milestone.push(milestoneList[i])

   }

    let data = {
      customer_id:values.clist.id,
      du_id:values.dulist.id,
      project_manager:values.emplist.id,
      project_name:values.project_name,
      project_type_id:values.projectType.id,
      sez_unit:values.sezunit.id,
      project_category:values.projectCat,
      project_start_date:values.project_start_date,
      project_end_date:values.project_end_date,
      sow_start_date:values.sow_start_date,
      sow_end_date:values.sow_end_date,
      status:values.status,
      description:values.description,
      billable_resource:[...billability],
      project_milestone:[...milestone],
      attachment:[...filename]
    }
    console.log(data);



    instance.post('/projects/', data)
        .then((response) => {
            console.log(response);
            swal({
               
                text: "Project Added Successufully",
                icon: "success",
                buttons: false,
                dangerMode: false,
                timer: 2000,
              })
              props.history.push('/projectlist');
     
           
        }, (error) => {
            console.log(error);
        });
     //setValues(initialInputs);
    // setInterval(1000)
   

}

const handleClose=()=>{
    props.history.push('/projectlist');
}
    return (
        <div className="mainContent">
         <form onSubmit={handleSubmit} >
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
                           
                            size="small"
                            getOptionLabel={option => option.name}
                            onChange={(event, clist) => {
                                setValues({ ...values, clist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    {option.name}
                                </React.Fragment>
                            )}
                            style={{width:"220px",marginTop:"16px",marginLeft:"10px"}}
                            renderInput={params => <TextField {...params} label="Customer Name" required={true} InputLabelProps={{ shrink: true }} variant="outlined"/>}
                        />
                               
                        <Autocomplete
                            id="DU"
                            options={du}
                            size="small"
                            getOptionLabel={option => option.name}
                            onChange={(event, dulist) => {
                                setValues({ ...values, dulist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    {option.name}
                                </React.Fragment>
                            )}
                            style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                            renderInput={params => <TextField {...params} label="DU" required={true}  InputLabelProps={{ shrink: true }} variant="outlined"/>}
                        />

                                <TextField
                                    label="DU Head"
                                    id="du_head"
                                    size="small"
                                    value={values.dulist?duhead:""}
                                    onChange={handleChange("du_head")}
                                  //  value={}
                                    //     InputProps={{
                                    //         classes: {
                                    //         root: classes.cssOutlinedInput,
                                    //         focused: classes.cssFocused,
                                    //         notchedOutline: classes.notchedOutline,
                                    //         },
                                    //     }}
                                    InputLabelProps={{ shrink: true }}
                                    style={{ marginLeft: "30px",width:"220px" }}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                />

                               
                        <Autocomplete
                            id="Project Manager"
                            options={employee}
                            size="small"
                            getOptionLabel={option => option.display_name}
                            onChange={(event, emplist) => {
                                setValues({ ...values, emplist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    {option.display_name}
                                </React.Fragment>
                            )}
                            style={{width:"220px",marginTop:"16px",marginLeft:"30px"}}
                            renderInput={params => <TextField {...params} label="Project Manager" required={true}  InputLabelProps={{ shrink: true }} variant="outlined"/>}
                        />

                            </div>
                            <div style={{ display: "inline-flex" }}>
                            <TextField
                                    label="Project Name"
                                    required={true}
                                    size="small"
                                    id="project_name"
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
                               
                                {/* <TextField
                                    label="Project Manager"
                                    required={true}
                                    id="proj_manager"
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
                                    style={{ marginLeft: "30px" }}
                                    margin="normal"
                                    variant="outlined"
                                /> */}

                                <Autocomplete
                                    id="Project Type"
                                    size="small"
                                    options={ptype}
                                   

                                    getOptionLabel={option => option.name}
                                    onChange={(event, projectType) => {
                                        setValues({ ...values, projectType });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         {option}
                                    //     </React.Fragment>
                                    // )}

                                    style={{ width: "220px", marginLeft: "30px" }}
                                    renderInput={params => <TextField {...params}  label="Project Type"
                                        InputLabelProps={{ shrink: true }}
                                        required={true}
                                        margin="normal"
                                        variant="outlined"
                                    />}
                                />  

                                {/* <TextField
                                    label="Project Type"
                                    required={true}
                                    id="project_type"
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
                                    style={{ marginLeft: "30px" }}
                                    margin="normal"
                                    variant="outlined"
                                /> */}
                                <Autocomplete
                                    id="sez_unit"
                                    size="small"
                           
                                    options={szunit}
                                    //defaultValue={values.}

                                    getOptionLabel={option => option.name}
                                    onChange={(event, sezunit) => {
                                        setValues({ ...values, sezunit });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         {option}
                                    //     </React.Fragment>
                                    // )}
                                    style={{ width: "220px",marginLeft:"30px" }}
                                    renderInput={params => <TextField {...params} required={true} label="SEZ Unit"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        variant="outlined"
                                    />}
                                />
                                <Autocomplete
                                    size="small"
                                    id="project_category"
                                    options={project_category}
                                    getOptionLabel={option => option}
                                    onChange={(event, projectCat) => {
                                        setValues({ ...values, projectCat });
                                    }}
                                    renderOption={option => (
                                        <React.Fragment>
                                            {option}
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
                                    id="status"
                                    options={status}
                                    getOptionLabel={option => option}
                                    onChange={(event, status) => {
                                        setValues({ ...values, status });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
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
                                    type="number"
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
                                    onChange={handleChange("milestone_name")}
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
                                    onChange={handleChange("milestone_details")}
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
                                    type="number"
                                    onChange={handleChange("amount")}
                                    style={{ width: "20%", marginLeft: "30px" }}
                                    id="amount"
                                    size="small"
                                   
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
                <Button className={classes.button} variant="contained" onClick={() => handleClose()}>Cancel</Button>
                <Button className={classes.button} style={{ marginLeft: "30px" }} variant="contained" onClick={()=>handleSubmit()}>Save</Button>
            </div>
        </form>
        </div>
    )
}

export default AddProject;