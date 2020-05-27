import React,{useState,useEffect} from 'react';
import {createStyles,fade,Theme,withStyles,makeStyles,createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUIDataTable from "mui-datatables";
import { Button, Paper, TextareaAutosize, Radio,Tooltip,  RadioGroup, FormControlLabel, TextField } from '@material-ui/core';
import Done from "@material-ui/icons/Done";
// import FileUplaod from './../../common/FileUpload/FileUpload'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {DropzoneArea} from 'material-ui-dropzone';
import instance from '../../common/instance';
import swal from 'sweetalert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DropDown from '../../common/DropDown';
// import * as Yup from 'yup';

// import { useFormik } from 'formik';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };








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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
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
    //  MuiTableCell: {
    //     root: {
    //         marginLeft: "70px",
    //       backgroundColor: "#FFF",
    //       //  display: table-cell,
    //     //   padding: "4px"
    //     }
    //   },
        MuiSelect: {
            root: {
                marginLeft: "70px",
                //backgroundColor: "#FFF",
                width: "120px",
                height: "2px",      //  display: "table-cell",
                //paddingTop: "10px"
            }
        },
       


    }
})


//Dropdown Data
//for Region
const region = [
    // {
    //     value: "Africa",
    //     label: "Africa"
    // },
    {
        value: "Asia",
        label: "Asia"
    },
    {
        value: "Europe",
        label: "Europe"
    },
    {
        value: "America",
        label: "America"
    }
]

//for customer type
const customertype = [
    {
        value: "Enterprise",
        label: "Enterprise"
    },
    {
        value: "ISV",
        label: "ISV"
    },
    // {
    //     value: "Type3",
    //     label: "Type3"
    // },
    // {
    //     value: "Type4",
    //     label: "Type4"
    // }
]

//for Evaluation Role
const evalution_role = [
    {
        value: "Decoder",
        label: "Decoder"
    },
    {
        value: "Influencer",
        label: "Influencer"
    },
    {
        value: "Champion",
        label: "Champion"
    },
    {
        value: "Sponsoring Executive",
        label: "Sponsoring Executive"
    }
]
const domain_list = [
    "1HealthCare",
    "2P & D",
    "3Android",   
]
//For Influence
const influence = [
    {
        value: "High",
        label: "High"
    },
    {
        value: "Medium",
        label: "Medium"
    },
    {
        value: "Low",
        label: "Low"
    }
]

//For Preference
const preference = [
    {
        value: "Neutral",
        label: "Neutral"
    },
    {
        value: "Favors Nitor",
        label: "Favors Nitor"
    },
    {
        value: "Favors Alternative",
        label: "Favors Alternative"
    },
    {
        value: "Don't Know",
        label: "Don't Know"
    }
]

//for Influence Power
const influence_power = [
    {
        value: "1",
        label: "1"
    },
    {
        value: "2",
        label: "2"
    },
    {
        value: "3",
        label: "3"
    },
    {
        value: "4",
        label: "4"
    },
    {
        value: "5",
        label: "5"
    }
]


const AddCustomer = (props) => {
    // const formik = useFormik({
    //     initialValues: {
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //     },
    //     // validate,
    //     validationSchema: Yup.object({
    //         firstName: Yup.string()
    //           .max(15, 'Must be 15 characters or less')
    //           .required('Required'),
    //         lastName: Yup.string()
    //           .max(20, 'Must be 20 characters or less')
    //           .required('Required'),
    //         email: Yup.string()
    //           .email('Invalid email address')
    //           .required('Required'),
    //       }),   
    //     onSubmit: values => {
    //       alert(JSON.stringify(values, null, 2));
    //       console.log(values);
    //     },
    //   });
    // height of the TextField
    const height = 10
    const columns = [
        { label: "Id", name: "id", options: { display: false } },
        { label: "Contact Name", name: "contact_name" },
        { label: "Title", name: "title" },
        { label: "Reporting Manager", name: "reporting_manager" },
        { label: "Evaluation Role", name: "evaluation_role" },
        { label: "Influence", name: "influence" },
        { label: "Preference", name: "preference" },
        { label: "Influencing Power", name: "influencing_power" },
        { label: "Contact Number", name: "contact_number" },
        { label: "Email", name: "email_id" },
        { label: "Coverage", name: "coverage" },
        
        
        
    ];
    let isLoading = true;
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        download: false,
        print: false,
        selectableRows: false,
        viewColumns: false,
        search:false,
        filter:false,
        pagination:false,
        textLabels: {
            body: {
            noMatch:isLoading ?
            // <CircularProgress color="secondary" /> 
            "":
            'Sorry, there is no matching data to display',
            },
            },

    };
   

    const classes = useStyles();
    const [values, setValues] =useState([]);

    const [ countries,setCountries]=useState([]);
    const [ domains,setdomains]=useState([]);
    const [ types,settypes]=useState([]);
    const [ regions,setregions]=useState([]);
    


    let countriesInfo = [];
    let domainsInfo = [];
    let typesInfo = [];
    let regionsInfo = [];

    
    useEffect(()=>{
    
    //Region Dropdownlist    
      instance.get('/regions/')
      .then(response => {
        //   console.log(response)
          for (const key in response.data) {
            regionsInfo.push({
                    region_id: response.data[key].region_id,
                    region_name: response.data[key].region_name,
                })


          }
          setregions(regionsInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })
    
      //Project Dropdownlist    
    //   instance.get('/countries/')
    //   .then(response => {
    //       console.log(response)
    //       if(values.region)
    //       console.log(values.region.region_id);
    //       for (const key in response.data) {
    //         countriesInfo.push({
    //               id: response.data[key].country_id,
    //               name: response.data[key].country_name,
    //             })


    //       }
    //       setCountries(countriesInfo)
    //       // console.log(projectInfo)
    //   })
    //   .catch(error => { console.log(error) })
   
     //Domains Dropdownlist    
      instance.get('/domains/')
      .then(response => {
        //   console.log(response)
          for (const key in response.data) {
            domainsInfo.push({
                  id: response.data[key].domain_id,
                  name: response.data[key].domain_name,
                })


          }
          setdomains(domainsInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })
   
     //Types Dropdownlist    
      instance.get('/customer_type/')                        
      .then(response => {
        //   console.log(response)
          for (const key in response.data) {
            typesInfo.push({
                customer_type_id: response.data[key].customer_type_id,
                customer_type_name: response.data[key].customer_type_name,
                })


          }
          settypes(typesInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })



    },[])


    useEffect(()=>{
        instance.get('/countries/')
        .then(response => {
            // console.log(response)
            if(values.region){
           // console.log(values.region.region_id);
            for (const key in response.data) {
            if(values.region.region_id===response.data[key].region_id){
              countriesInfo.push({
                    id: response.data[key].country_id,
                    name: response.data[key].country_name,
                  })
  
  
            }
            setCountries(countriesInfo)
            // console.log(projectInfo)
        }
     }
        else{
            for (const key in response.data) {
                countriesInfo.push({
                    id: response.data[key].country_id,
                    name: response.data[key].country_name,
                  })
            }
            setCountries(countriesInfo)
        }
        })
        .catch(error => { console.log(error) })
    },[values.region])



console.log(values);

    const [personName, setPersonName] = React.useState([]);


    let newdomainlistnames=[];
    domains.forEach((d)=>{
        const data=[];
        data.push(d.name);
        newdomainlistnames.push(data[0]);
    });
  

    const handleChang = (event) => {
        setPersonName(event.target.value);
        console.log(personName);
        
      };
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const [files, setfiles] =useState([]);

    const handleChange1 = (file) => {
        // console.log("hi1");
        
        // setValues({ ...values, [name]: event.target.value });
        setfiles(file);
    };
    // console.log(files);
    
    const handleChange2 = () => {
        console.log("hi2");
        
        // setValues({ ...values, [name]: event.target.value });
        console.log(files);
        
    };
   
    // let datalist = [];
    let data=[];
    const initialInputs = {section_title:"",}
    const [val, setVal] = React.useState(initialInputs)

    const [datalist,setdatalist]=useState([]);
    const addStakeholder =() =>{
        // e.preventDefault();
        console.log("add");
        // document.getElementById("stakeholder-form").reset();
        // document.getElementById("evalution_role").reset();
        console.log(data);
        console.log(data.length);
        
        const data1 = {
                        contact_name:values.contact_name,
                        title:values.title,
                        reporting_manager:values.reporting_manager,
                        contact_number:values.contact_number,
                        
                        evaluation_role:values.evalution_role.value,
                        influence:values.influence.value,
                        preference:values.preference.value,
                        influencing_power:values.influence_power.value,
                        
                        email_id:values.email,
                        coverage:values.coverage,
                        // status:"true"
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
        
        setVal(initialInputs);
        // setdatalist(data)

        console.log(datalist);
        
        
    }
    // console.log(datalist);

    const handleSubmit = (e,file) => {
        e.preventDefault()
        console.log("form submited");
        console.log(values);
        console.log("------------------");
        console.log(files);
        console.log("-----------------");
        console.log(datalist);



        console.log(personName);
        
    // let f1,f2,f3;  
    // if(files[0])  
    //      f1=files[0].name
    // if(files[1])  
    //      f2=files[1].name
    // if(files[2])
    //      f3=files[2].name
        let filename=[];
        for (let i = 0; i <files.length; i++) {
            filename.push(files[i].name)
            
        }

        let stakeholders=[]
        for (let i = 0; i < datalist.length; i++) {
            stakeholders.push(datalist[i])
        }

        let domainsList=[]
        // for (let i = 0; i <  values.domainsData.length; i++) {
        //     domainsList.push(values.domainsData[i].id)
        // }
        for (let i = 0; i < domains.length; i++) {
            // console.log(domains[i].name);
            
            for(let j=0;j<personName.length;j++){
                // console.log(personName[j]);
                if(domains[i].name==personName[j])
                {
                    console.log("found id");
                    let id=(domains[i].id).toString();
                    domainsList.push(id)
                    
                }
            }
           
            
        }
        console.log(domainsList);
        
        let r = Math.random().toString(36).substring(7);
        
        console.log(r);

        let data={
            
                
                company_name: values.company_name,
                short_name: values.short_name,
                // code:  r,
                // customer_type: values.customer_type.value,
                customer_type_id: values.customer_type.customer_type_id,
                country_id:values.country_name.id ,
                domain_id: [...domainsList ],
                region_id: values.region.region_id,
                // region_id: 1,
                status: "status",
                onboarding_date:values.onboarding_date ,
                website: [
                    values.website
                  ],

               
                  attachments: [...filename],
                  stakeholders:[...stakeholders]
          
        }
        console.log(data);

         instance.post('/customers/', data)
            .then((response) => {
                console.log(response);
                swal( "Customer Added successfully!", {
                    button:false,
                    timer:2000,
                    icon:"success"
                });
                // props.addInput(data)
                props.history.push('/customer')  
            }, (error) => {
                console.log(error);
            });

    }

    var currentdate = new Date();
// console.log(currentdate);
var dd = currentdate.getDate();
var mm = currentdate.getMonth()+1; 
var yyyy = currentdate.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
 currentdate = yyyy+'-'+mm+'-'+dd;
// console.log(currentdate);



    const changeSocialUrl =     (e) =>{
        var string = e.target.value;
        if (!~string.indexOf("http")) {
            string = "http://" + string;
        }
        e.target.value = string;
        return e
    }
    const validEmail = (e) =>{
        // var string = e.target.value;
        // // console.log(string);
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        // if(!re.test(e.target.value)){
        //     console.log("if");
            
        //     e.target.value = "";
        // }
            

        //     else
        //     e.target.value=string
        // return e

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(e.target.value))
    alert("Please enter a valid email address");


    }

    const handleClose =()=>{

        console.log(values);
        console.log(personName);
        console.log(files);
        console.log(values.length);
        console.log(personName.length);
        console.log(files.length);
//         values.company_name
// values.short_name
// values.customer_type.customer_type_id
// values.country_name.id
// values.region.region_id
// values.onboarding_date
// values.website
        
        if(values.short_name='' || datalist || files)
        {
            console.log("values present");
            
        }
        else
            console.log("back");
            
        // props.history.push('/customer')

    }
    
    let no1=parseInt("999999999");
    let no2=parseInt("10000000000");
    // console.log(no1);
    // console.log(no2);
    

    
let str="2020-05-12"
    return (

        <div className="mainContent">
            
            <div className={classes.root}>
                
                {/* <h3>Add Customer</h3> */}
                <form id="allform" onSubmit={handleSubmit}>
                <ExpansionPanel
                    defaultExpanded
                >
                    <ExpansionPanelSummary
                        // style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.heading}
                    >
                        <Typography id="custdetail"><b>Customer Details</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ marginTop: "10px" }}>
                            <div style={{ display: "inline-flex" }}>
                                <Autocomplete
                                    
                                    id="region"
                                    options={regions}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option.region_name}
                                    onChange={(event, region) => {
                                        setValues({ ...values, region });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Region" variant="outlined" InputLabelProps={{ shrink: true }} required={true}/>}
                                />

                                <Autocomplete
                                    id="country"
                                    options={countries}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option.name}
                                    onChange={(event, country_name) => {
                                        console.log(country_name);
                                        
                                        setValues({ ...values, country_name });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Country" variant="outlined" InputLabelProps={{ shrink: true }}  required={true}/>}
                                />

                                <TextField 
                                    required={true}
                                    id="company"
                                    label="Company Name"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue=""
                                    className={classes.textField}
                                    value={values.name}
                                    onChange={handleChange("company_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:430,marginLeft:"35px"}}
                                />
                            </div>
                            <div style={{ display: "inline-flex"}}>
                               <TextField  
                                    required={true}
                                    id="shortn"
                                    label="Company Short Name"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue=""
                                    className={classes.textField}
                                    value={values.short_name}
                                    onChange={handleChange("short_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}

                                /> 

                                <Autocomplete
                                    id="c_type"
                                    // options={customertype}
                                    options={types}
                                    // options={customertype}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option.customer_type_name}
                                    onChange={(event, customer_type) => {
                                        setValues({ ...values, customer_type });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Customer Type" variant="outlined" InputLabelProps={{ shrink: true }} required={true}/>}
                                    
                                />
                               

                                <TextField
                                    required={true}
                                    id="website"
                                    label="Website"
                                    type="url"
                                    // pattern="www.*"
                                    InputLabelProps={{ shrink: true }}
                                    
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("website")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:430,marginLeft:"35px"}}
                                    onBlur={(e)=> changeSocialUrl(e)}  
                                />
                            </div>
                            <div style={{ display: "inline-flex"}}>
                                
                            {/* <Autocomplete
                            multiple
                                    id="Domains List"
                                    options={domains}
                                    getOptionLabel={option=>option.name}
                                    onChange={(event,domainsData)=>
                                    {
                                        setValues({...values,domainsData});
                                    } }
                                    // renderOption={option=> (
                                    // <React.Fragment>
                                    // <b>{option.id}</b>&emsp;{option.name}
                                    // </React.Fragment>
                                    // )}
                                    style={{width:200,marginLeft:"35px",marginTop:"16px"}}
                                    renderInput={ params=> <TextField {...params} label="Select Domains " variant="outlined" InputLabelProps={{ shrink: true }} 
                                    // required={true}
                                    />}
                                    margin="normal"
                                    variant="outlined"
                                /> */}
                            <FormControl variant="outlined" className={classes.formControl}>
                             <InputLabel id="demo-mutiple-checkbox-label" 
                              style={{marginLeft:"35px",marginTop:"10px"}}
                             >Domain </InputLabel>
                               <Select
                                    required
                                    style={{width:200,marginLeft:"27px",marginTop:"8px",height:"55px"}}
                                    // labelId="demo-mutiple-checkbox-label"
                                    id="domain"
                                    multiple
                                    // value={newdomainlistnames}
                                    displayEmpty
                                    onChange={handleChang}
                                    defaultValue={newdomainlistnames}
                                    // input={<Input variant="outlined" required={true} />}
                                    //   InputLabelProps={{ minlength:1 }} 
                                    renderValue={(selected) => 
                                        // {
                                        // console.log(selected)
                                        
                                        selected.join(",")
                                    // }
                                    }
                                    MenuProps={MenuProps}
                                    >
                                    <MenuItem value="">
                                        <em>select the value</em>
                                    </MenuItem>
{/*                                    
                                    {domain_list.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))} */}
                                    {newdomainlistnames.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    </FormControl>

                                <TextField
                                    required={true}
                                    id="date"
                                    label="Onboarding Date"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ max:currentdate }}
                                    type="date"
                                    className={classes.textField}
                                    value={values.start_date}
                                    
                                    
                                    onChange={handleChange("onboarding_date")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />
                               
                               
                            </div>
                           
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    defaultExpanded
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography id="stake"><b>Stakeholders</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <form 
                    id="add_form" 
                    // onSubmit={formik.handleSubmit}
                    // onSubmit={(e)=>addStakeholder(e)}
                    // onSubmit={addStakeholder}
                    >
                        <div style={{height:"50%"}}>
                            <div style={{ display: "inline-flex"  }}>
                            <TextField
                            required={true}
                                    // id="outlined-name"
                                    id="scontact"
                                    name="contact_name"
                                    label="Contact Name"
                                    InputLabelProps={{ shrink: true }}
                                    // form="stakeholder-form"
                                    className={classes.textField}
                                    // value={values.start_date}
                                   
                                    // value={formik.values.firstName}
                                    onChange={handleChange("contact_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />
                             

                                <TextField
                                required={true}
                                    id="stitle"
                                    label="Title"
                                    InputLabelProps={{ shrink: true }}
                                    form="stakeholder-form"
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("title")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />

                                <TextField
                                required={true}
                                    id="srepmgr"
                                    label="Reporting Manager"
                                    InputLabelProps={{ shrink: true }}
                                    form="stakeholder-form"
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("reporting_manager")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />  
                                <TextField
                                required={true}
                                    id="sno"
                                    label="Contact Number"
                                    type="number"
                                    InputLabelProps={{ shrink: true }}
                                    // InputProps={{ inputProps: { min: no1 ,max: no2 } }}
                                    className={classes.textField}
                                    // value={values.start_date}
                                    form="stakeholder-form"
                                    onChange={handleChange("contact_number")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:220,marginLeft:"35px"}}
                                    onInput = {(e) =>{
                                        e.target.value = Math.max(0, parseInt(e.target.value)<10000000000?parseInt(e.target.value):e.target.value ).toString().slice(0,10)
                                    }}
                                /> 
{/* 
<TextField
                    required={true}
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
                        /> */}
                               
                            </div>

                            <div style={{ display: "inline-flex"}}>

                              
                                <Autocomplete
                        
                                    id="sevalrol"
                                    options={evalution_role}
                                    
                                    form="stakeholder-form"
                                    getOptionLabel={option => option.label}
                                    onChange={(event, evalution_role) => {
                                        setValues({ ...values, evalution_role });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} id="t1" label="Evaluation Role" variant="outlined" InputLabelProps={{ shrink: true }}
                                    required={true}/>}
                                />
                                 <Autocomplete
                                 
                                    id="spref"
                                    options={preference}
                                    //defaultValue={values.}
                                    form="stakeholder-form"
                                    getOptionLabel={option => option.label}
                                    onChange={(event, preference) => {
                                        setValues({ ...values, preference });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} id="t2" label="Preference" variant="outlined" InputLabelProps={{ shrink: true }}
                                    required={true}/>}
                                />
                                <Autocomplete
                                
                                    id="sinflu"
                                    options={influence}
                                    //defaultValue={values.}
                                    form="stakeholder-form"
                                    getOptionLabel={option => option.label}
                                    onChange={(event, influence) => {
                                        setValues({ ...values, influence });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:140,marginTop:"16px",marginLeft:"33px"}}
                                    renderInput={params => <TextField {...params} label="Influence" variant="outlined" InputLabelProps={{ shrink: true }}
                                    required={true}/>}
                                />

                                <Autocomplete
                                
                                    id="sinfpow"
                                    options={influence_power}
                                    //defaultValue={values.}
                                    form="stakeholder-form"
                                    getOptionLabel={option => option.label}
                                    onChange={(event, influence_power) => {
                                        setValues({ ...values, influence_power });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:100,marginTop:"16px",marginLeft:"33px"}}
                                    renderInput={params => <TextField {...params} label="Influence Power" variant="outlined" InputLabelProps={{ shrink: true }}
                                    required={true}/>}
                                />
                               
                               <TextField
                               required={true}
                                    id="scove"
                                    label="Coverage"
                                    InputLabelProps={{ shrink: true }}
                                    form="stakeholder-form"
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("coverage")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:150,marginLeft:"33px"}}
                                />  


                                {/* <div style={{ width: "22%", marginLeft: "30px", height:"10px"}}>
                                    <DropDown
                                        id="influence"
                                        label="Influence"
                                        handleChange={handleChange}
                                        data={influence}

                                    />
                                </div>

                                <div style={{ width: "23%", marginLeft: "30px"}}>
                                    <DropDown
                                        
                                        id="preference"
                                        label="Preference"
                                      
                                        handleChange={handleChange}
                                        data={preference}
                                    />
                                </div>
                                <div style={{ width: "23%", marginLeft: "30px" }}>
                                    <DropDown
                                       
                                        id="influence_power"
                                        label="Influence Power"
                                        
                                        handleChange={handleChange}
                                        data={influence_power}
                                    
                                    />
                                </div> */}
                            </div>
                            <div style={{display:"flex"}}>
                                
                            

                                <TextField
                                required={true}
                                    id="semail"
                                    label="Email ID"
                                    type="email"
                                    // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                    InputLabelProps={{ shrink: true }}
                                    form="stakeholder-form"
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("email")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:440,marginLeft:"35px"}}
                                    // onBlur={(e)=>validEmail(e)}
                                    onBlur={(e)=>validEmail(e)}
                                    />  


                               
                                <Button  
                                id="addstake"
                                // form="stakeholder-form"  
                                // type="submit"
                                className={classes.button} style={{height:40,marginLeft:"27%",marginTop:"25px"}} variant="contained" 
                                        //  onSubmit={(e)=>addStakeholder(e)}
                                         onClick={addStakeholder}
                                        >
                                                    ADD Stakeholder
                                </Button> 
                            </div>
                            <br></br>
                            <div style={{display:"flex" ,marginLeft:"30px"}}>
                            <MuiThemeProvider theme={getMuiTheme()}>
                                <MUIDataTable
                                        // title={"Customers"}
                                        data={datalist}
                                        columns={columns}
                                         options={options}
                                    //  className={classes.root}
                                />
                                </MuiThemeProvider>
                             </div>
                        </div>

                    </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br></br>
              
                <ExpansionPanel
                    defaultExpanded
                >
                    <ExpansionPanelSummary
                        style={{ background: "rgb(127,127,127)" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className={classes.heading}
                    >
                        <Typography id="attach"><b>Attachments</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        {/* <div className="input-group">
                           
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choose file
                            </label>
                            </div> */}
                           <div style={{width:"100%"}}>
                           {/* <DropzoneArea
                               dropzoneText="Drag and Drop Files Here to Upload"
                               filesLimit={1000}
                               acceptedFiles={[]}
                               showPreviews={true}
                               maxFileSize={500000000000000}
                               showPreviewsInDropzone={false}
                               showFileNamesInPreview={true}
                               previewText="Files"
                                onChange={handleChange1.bind("file")}
                             /> */}
                             <DropzoneArea
                                  id="file"
                                dropzoneText="Drag and Drop Files Here to Upload"
                                filesLimit={1000}
                                acceptedFiles={[]}
                                showPreviews={true}
                                maxFileSize={500000000000000}
                                showPreviewsInDropzone={false}
                                 showFileNames={true}
                                // previewText="Files"
                                // dropzoneClass={classes.DropzoneArea}
                                useChipsForPreview={true}
                                onChange={handleChange1.bind("file")}
                            />

                           </div>
                           
                        
                    </ExpansionPanelDetails>
                    {/* <button onClick={handleChange2}>ADD</button> */}
                    {/* <Button className={classes.button} 
                            style={{ marginLeft: "45%" }} 
                            variant="contained" type="submit" 
                            onClick={()=>handleChange2()}>
                                Upload file
                    </Button> */}
                    <br></br><br></br>
                </ExpansionPanel>
                <div style={{ float: "right" }}>
                    <Button id="cancel" className={classes.button} variant="contained" onClick={()=>handleClose()}>Cancel</Button>
                    <Button id="save" className={classes.button} style={{ marginLeft: "30px" }} variant="contained" type="submit">Save</Button>
                </div>
                </form>
            </div>
          
        </div>
    )
}

export default AddCustomer;