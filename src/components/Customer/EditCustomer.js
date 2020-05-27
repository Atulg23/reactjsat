
import React,{useState} from 'react';
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
import {DropzoneArea} from 'material-ui-dropzone'
import instance from '../../common/instance';
import IconButton from "@material-ui/core/IconButton";
import swal from 'sweetalert';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from '@material-ui/core/CircularProgress';



import DropDown from '../../common/DropDown';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
     MuiTableCell: {
        root: {
            // marginLeft: "70px",
          backgroundColor: "#FFF",
          //  display: table-cell,
          padding: "4px"
        }
      },
        MuiSelect: {
            root: {
                // marginLeft: "70px",
                //backgroundColor: "#FFF",
                width: "120px",
                height: "2px",      //  display: "table-cell",
                //paddingTop: "10px"
            }
        },
       


    }
})


//Dropdown Data

const customertype = [
    // "Type1",
    // "Type2",
    // "Type3",
    // "Type4",
    "Enterprise",
    "ISV"

]
// const region1 = [
//     {
//         value: "Africa",
//         label: "Africa"
//     },
//     {
//         value: "Asia",
//         label: "Asia"
//     },
//     {
//         value: "Europe",
//         label: "Europe"
//     },
//     {
//         value: "America",
//         label: "America"
//     }
// ]

const domain_list = [
    "1HealthCare",
    "2P & D",
    "3Android",   
]

const region1 = [
   "Africa",
   "Asia",
   "Europe",
   "America",
    
]
//for Evaluation Role
const evalution_role = [
 "Decoder",
 "Influencer",
 "Champion",
"Sponsoring Executive",

]

//For Influence
const influence = [
    "High",
    "Medium",
    "Low",
  
]

//For Preference
const preference = [
    "Neutral",
    "Favors Nitor",
    "Favors Alternative",
    "Don't Know"
]

//for Influence Power
const influence_power = [
    "1",
    "2",
    "3",
    "4",
    "5",
  
]


const EditCustomer = (props) => {
    // console.log(props);
    const [regionname,setregionname]=useState(region1);
    const [attachments,setattachments]=useState([]);
    const [countryname,setcountryname]=useState("");
    const [countryid,setcountryid]=useState();
    const [regionid,setregionid]=useState();
    const [customertypeid,setcustomertypeid]=useState();
    const [companyname,setcompanyname]=useState("");
    const [shortname,setshortname]=useState("");
    const [typelist,settypelist]=useState("");
    const [website,setwebsite]=useState("");
    const [domainlist,setdomainlist]=useState([]);
    const [date,setdate]=useState("");


    const [ regions,setregions]=useState([]);
    const [ countries,setCountries]=useState([]);
    const [ domains,setdomains]=useState([]);
    const [ types,settypes]=useState([]);

    const[stakeholderlist,setstakeholderlist]=useState([]);
    let regionsInfo =[];
    let countriesInfo = [];
    let domainsInfo = [];
    let stakeholderInfo = [];
    let typesInfo = [];
    
    React.useEffect(()=>{
    
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

    //Countries Dropdownlist    
      instance.get('/countries/')
      .then(response => {
        //   console.log(response)
          for (const key in response.data) {
            countriesInfo.push({
                    country_id: response.data[key].country_id,
                     country_name: response.data[key].country_name,
                })


          }
          setCountries(countriesInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })
   
     //Domains Dropdownlist    
      instance.get('/domains/')
      .then(response => {
        //   console.log(response)
          for (const key in response.data) {
            domainsInfo.push({
                    domain_id: response.data[key].domain_id,
                  domain_name: response.data[key].domain_name,
                })


          }
          setdomains(domainsInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })


      //Customer Types Dropdownlist    
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
     
     
     //for Stakeholder table
      instance.get(`customers/stakeholders/${props.location.state.cno}`)
      .then(response => {
          console.log(response)
          for (const key in response.data) {
            stakeholderInfo.push({
                  id: response.data[key].stakeholder_id,
                  customer_id:response.data[key].customer_id,
                  contact_name: response.data[key].contact_name,
                  title: response.data[key].title,
                  reporting_manager: response.data[key].reporting_manager,
                  evaluation_role: response.data[key].evaluation_role,
                  influence: response.data[key].influence,
                  preference: response.data[key].preference,
                  influencing_power: response.data[key].influencing_power,
                  contact_number: response.data[key].contact_number,
                  email_id: response.data[key].email_id,
                  coverage: response.data[key].coverage,
                })


          }
          setstakeholderlist(stakeholderInfo)
          // console.log(projectInfo)
      })
      .catch(error => { console.log(error) })


      


    },[])
    
    
   const [domainlistids,setdomainlistids]=useState([]);
   let domainidlist=[]
    React.useEffect(()=>{
        instance.get(`/customers/${props.location.state.cno}`)
        .then(response => {
            // console.log(response)
            // console.log(response.data.customer_type[0])
            
            setattachments([...response.data.attachments])

            let regionname=response.data.region[0]
            setregionname(regionname)
            
            let regionid=response.data.region_id
            setregionid(regionid)
            
            let countryname=response.data.country[0]
            setcountryname(countryname)
           
            let countryid=response.data.country_id
            setcountryid(countryid)
           
            let companyname=response.data.company_name 
            setcompanyname(companyname)

            let shortname=response.data.short_name 
            setshortname(shortname)

            let type=response.data.customer_type[0]
            settypelist(type)
            
            let typeid=response.data.customer_type_id
            setcustomertypeid(typeid)
            let website=response.data.website[0]
            setwebsite(website)

            // let domain=response.data.domains[0]
            // setdomainlist(domain)

            
             domainidlist=[...response.data.domain_id]
            //  console.log(domainidlist);
             
            setdomainlistids([...response.data.domain_id])

            let date=response.data.onboarding_date.slice(0,10)
            setdate(date)



                // console.log(domainlistids);


                // console.log(regionname)
                // console.log(countryname)
                // // console.log(typeof(countryname));
                
                //  console.log(typelist)
                // // console.log(shortname)
                // console.log(typelist)
                // console.log(website)
                //  console.log(domain)
                // console.log(date)
            
            // console.log(response.data.employees[0].display_name);
            // setmgrname(response.data.employees[0].display_name)
            // setduname(response.data.delivery_units[0].name)
            // for (const key in response.data) {
            //     mgrnamelist.push({
            //         m: response.data[key].project[0].id,
            //     })
            // }
        //    setassignedProjectList(assignedprojlist);
        })
        .catch(error => { console.log(error) })
    },[])
   //    console.log(regionname)
   const [personName, setPersonName] = React.useState([]);




// console.log(types);
// console.log(typelist);


   let datalist = [];

   
   const dummyData1 = [
    {
    "id":1,
    "contact_name": "person1",
    "title":"t1",
    "reporting_manager":"m1",
    "evaluation_role":"r1",
    "influence":"i1",
    "preference":"p1",
    "influencing_power":"r",
    "contact_number":"1231212312312",
    "email_id":"a@a.com",
    "coverage":"c1",
   },
    {
    "id":2,
    "contact_name": "person2",
    "title":"t2",
    "reporting_manager":"m2",
    "evaluation_role":"r2",
    "influence":"i2",
    "preference":"p2",
    "influencing_power":"ip2",
    "contact_number":"12312123123",
    "email_id":"b@b.com",
    "coverage":"c2",
   },
  ]
//   console.log(stakeholderlist);
   stakeholderlist.forEach((c) => {
//    dummyData1.forEach((c) => {
       const data = [];
       
      
       
       data.push(c.id)
       data.push(c.contact_name)
       data.push(c.title)
       data.push(c.reporting_manager)
       data.push(c.evaluation_role)
       data.push(c.influence)
       data.push(c.preference)
       data.push(c.influencing_power)
       data.push(c.contact_number)
       data.push(c.email_id)
       data.push(c.coverage)
       datalist.push(data);
       // console.log(datalist);
       
   });
//    console.log(domains);
   let newdomainlistnames=[];
   domains.forEach((d)=>{
       const data=[];
       data.push(d.domain_name);
       newdomainlistnames.push(data[0]);
   });
    // console.log(newdomainlistnames);
    
    const filenames=[]
   attachments.forEach((a)=>{
       const data=[];
       data.push(a);
       filenames.push(data[0])
   })
   
    // console.log(filenames[0]);


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
        { label: "Contact Number", name: "contact_no" },
        { label: "Email", name: "email" },
        { label: "Coverage", name: "coverage" },
        {
            label: "",
            options: {
                alignItems: 'center',
                filter: false,
                sort: false,
                empty: true,

                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;
                    // console.log(rowId);
                    
                   
                        return (
                          <div>
                            <IconButton onClick={()=>handleClickEdit(rowId[0],rowId[1])} >
                               <EditIcon />
                            </IconButton>
                            <IconButton onClick={()=>handleClickDelete(rowId[0])}>
                              <DeleteIcon />
                            </IconButton>
                         
                          </div>
                        )
                      }
                     
                   
                }
            },
        
        
        
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
            <CircularProgress color="secondary" /> :
            'Sorry, there is no matching data to display',
            },
            },

    };

//for edit values
    const [editform,seteditform]=useState(false)

    const initialState = { id:null, contact_name:"" };
  const [currentStakeholder, setcurrentStakeholder] = useState([]);

    const [contactname,setContactname]=useState("")
  
  const handleClickDelete =(id)=>{
      console.log(id);
      console.log(stakeholderlist);
      swal({
        title: "Are you sure Want to Delete Stakeholder?",
        // text: "Once deleted, you will not be ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            instance.delete(`/stakeholder/${id}`)
            .then(res => {
                  console.log(res);
                  swal({
                      title: "Done!",
                      text: "Data Deleted successfully",
                      icon: "success",
                      timer: 2000,
                      button: false
                  })
                  setcurrentStakeholder(currentStakeholder.filter(data=>data.id!==id))
      
      //         setdu(du.filter(data=>data.id !== id))
               })
               .catch(error=>{console.log(error)})
      setstakeholderlist(stakeholderlist.filter(data=>data.id!==id))
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      
//       instance.delete(`/stakeholder/${id}`)
//       .then(res => {
//             console.log(res);
//             swal({
//                 title: "Done!",
//                 text: "Data Deleted successfully",
//                 icon: "success",
//                 timer: 1000,
//                 button: false
//             })
//             setcurrentStakeholder(currentStakeholder.filter(data=>data.id!==id))

// //         setdu(du.filter(data=>data.id !== id))
//          })
//          .catch(error=>{console.log(error)})
// setstakeholderlist(stakeholderlist.filter(data=>data.id!==id))
      
  }
    const handleClickEdit =(id,name)=> {
       console.log(id);
       console.log(name);
    //    setContactname(name)
    // setViewEdit((domains.filter(data => data.id === id)[0]));
    // setcurrentStakeholder((dummyData1.filter(data => data.id==id)[0]))
    setcurrentStakeholder((stakeholderlist.filter(data => data.id==id)[0]))
        console.log(currentStakeholder);
        
    // setcurrentStakeholder({id:id,contactname:name})
       seteditform(true)
       
   }
   console.log(stakeholderlist);
   const addStakeholder =() =>{
    document.getElementById('add_form').reset();
    console.log(values);
    console.log(stakeholderlist);
    let addNewData={
        contact_name:values.add_contact_name,
        contact_number:values.add_contact_number,
        coverage:values.add_coverage,
        customer_id:props.location.state.cno,
        email_id:values.add_email,
        evaluation_role:values.add_evaluation_role,
        stakeholder_id:0,
        influence:values.add_influence,
        influencing_power:values.add_influence_power,
        preference:values.add_preference, 
        reporting_manager:values.add_reporting_manager,
        title:values.add_title ,
    }
    let datalist=[]
     datalist.push(addNewData)
     setstakeholderlist([...stakeholderlist,datalist[0]])
    console.log(addNewData);
    console.log(datalist);
    
    }


   const updateStakeholderlist =(id,updatedlist) =>{
       console.log(id);
       console.log(currentStakeholder);                //before updated values
       console.log(updatedlist);                        //only updated values
        
    //    console.log(dummyData1);


 //For API   
    let data=[];
    let datalist=[];
    console.log(stakeholderlist);
    // console.log((stakeholderlist.filter(data => data.id!==id)));
     data=(stakeholderlist.filter(data => data.id!==id || data.stakeholder_id!=id))
     console.log(data);
     
     console.log(data.length);
     if(data.length!=0){
    datalist.push(data[0]);
     }
    console.log(datalist);
    

 //For Dummy Data   

//  console.log((dummyData1.filter(data => data.id!==id)));
//   data=(dummyData1.filter(data => data.id!==id))
//     dummyData1.push(data);
//     console.log(dummyData1);
    
    

    let updatedcontactname,updatedcontactnumber,updatedcoverage,updatedemail_id,updatedevalutionrole,updatedinfluence,
        updatedinfluencingpower,updatedpreference,updatedreportingmanager,updatedtitle;
        
//contact name
    if(updatedlist.updated_contact_name)
        updatedcontactname=updatedlist.updated_contact_name
    else
        updatedcontactname= currentStakeholder.contact_name;
//contact number   
    if(updatedlist.updated_contact_number)
        updatedcontactnumber=updatedlist.updated_contact_number
    else
        updatedcontactnumber= currentStakeholder.contact_number;
//coverage   
    if(updatedlist.updated_coverage)
        updatedcoverage=updatedlist.updated_coverage
    else
        updatedcoverage= currentStakeholder.coverage;
//email_id   
    if(updatedlist.updated_email)
        updatedemail_id=updatedlist.updated_email
    else
        updatedemail_id= currentStakeholder.email_id;
//evaluation_role   
    if(updatedlist.evalutionrole)
        updatedevalutionrole=updatedlist.evalutionrole
    else
        updatedevalutionrole= currentStakeholder.evaluation_role;
//influence   
    if(updatedlist.influence)
        updatedinfluence=updatedlist.influence
    else
        updatedinfluence= currentStakeholder.influence;
//influencing power   
    if(updatedlist.influencepower)
        updatedinfluencingpower=updatedlist.influencepower
    else
        updatedinfluencingpower= currentStakeholder.influencing_power;
//preference   
    if(updatedlist.preference)
        updatedpreference=updatedlist.preference
    else
        updatedpreference= currentStakeholder.preference;
//reporting_manager   
    if(updatedlist.updated_reporting_manager)
        updatedreportingmanager=updatedlist.updated_reporting_manager
    else
        updatedreportingmanager= currentStakeholder.reporting_manager;
        
//title  
    if(updatedlist.updated_title)
        updatedtitle=updatedlist.updated_title
    else
        updatedtitle= currentStakeholder.title;


        
        
       datalist.push({
           stakeholder_id:id,
           contact_name:updatedcontactname,
           contact_number:updatedcontactnumber,
           coverage:updatedcoverage,
           email_id:updatedemail_id,
           evaluation_role:updatedevalutionrole,
           influence:updatedinfluence,
           influencing_power: updatedinfluencingpower,
           preference: updatedpreference,
           reporting_manager: updatedreportingmanager,
           title: updatedtitle,
           customer_id:props.location.state.cno
       })
    
    setstakeholderlist(datalist)
       console.log(stakeholderlist);
       
       seteditform(false)
   }
//    console.log(stakeholderlist);


// console.log(currentStakeholder);
// console.log(currentStakeholder.contact_name);

    const classes = useStyles();
    const [values, setValues] =useState([]);
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

  
         
  const[cname, setCname] = useState([]);
  
  const [inputCname, setInputCname] = useState('')
//   console.log(inputCname);
  
  const[inputRegion,setInputRegion]=useState('')
    // console.log(inputRegion);
    
  const [inputCountryname, setCountryname] = useState('')
// console.log(inputCountryname);

const[inputCType,setInputCType]=useState('');

const [files, setfiles] =useState([]);

const handleChange1 = (file) => {
    // console.log("hi1");
    
    // setValues({ ...values, [name]: event.target.value });
    setfiles(file);
};


const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Edit form");
    console.log(values);
    
    console.log(regionname);
    console.log(countryname);
    console.log(companyname);
    
    // console.log(shortname)
    // console.log(typelist)
    // console.log(website)
    //  console.log(domainlist)
    // console.log(date)
    console.log(personName)         //domain list
    // console.log(personName[0])         //domain list
    // console.log(personName.slice(0,1))         //domain list id
    // console.log(stakeholderlist);
    console.log(domains);
    
     let domain_id=[];
    for (let i = 0; i < domains.length; i++) {
        // console.log(domains[i].name);
        
        for(let j=0;j<personName.length;j++){
            // console.log(personName[j]);
            if(domains[i].domain_name==personName[j])
            {
                console.log("found id");
                let id=(domains[i].domain_id).toString();
                domain_id.push(id)
                
            }
        }
       
        
    }
    // console.log(domain_id);

    let filename=[];
    if(files.length>0){
    for (let i = 0; i <files.length; i++) {
        filename.push(files[i].name)
        filename.push(...attachments)
        }
    }
    else
    filename.push(...attachments)


    let updateddomainid=[];
    if(domain_id.length===0)
        updateddomainid=[...domainlistids]
    else
        updateddomainid=[...domain_id]

    //    console.log(updateddomainid);
        

    let stakeholders=[]
    for (let i = 0; i < stakeholderlist.length; i++) {
        stakeholders.push(stakeholderlist[i])
    }

    let updatedregion,updatedcountry,updatedcompanyname,updatedshortname,updatedtype,updateddate,updatedperson,updatedonboardingdate;
    let updatedwebsite;



    // if(values.company_name)
    //     updatedregion=values.company_name
    // else
    //     updatedregion=regionname
   
    if(values.company_name)
        updatedcompanyname=values.company_name
    else
        updatedcompanyname=companyname

    if(values.onboarding_date)
        updatedonboardingdate=values.onboarding_date
    else
        updatedonboardingdate=date
    
    if(values.short_name)
        updatedshortname=values.short_name
    else
        updatedshortname=shortname

    if(values.website)
        updatedwebsite=values.website
    else
        updatedwebsite=website
    if(countryname.country_id)
        updatedcountry=countryname.country_id
    else
        updatedcountry=countryid
  
    if(regionname.region_id)
        updatedregion=regionname.region_id
    else
        updatedregion=regionid
   
    if(typelist.customer_type_id)
        updatedtype=typelist.customer_type_id
    else
        updatedtype=customertypeid


        
        
    // const newArray = values.map(a => ({...a}));
    // console.log(typeof(values));
    // console.log(props.location.state.cno);
    
    let data={

        company_name: updatedcompanyname,
        short_name: updatedshortname,
        region_id:updatedregion,
        country_id: updatedcountry,
        
        onboarding_date: updatedonboardingdate,
        status:"status",
        website: [
            updatedwebsite
          ],
          domain_id: [...updateddomainid ],
          customer_type_id:updatedtype,
        
        stakeholders:[...stakeholders],
        attachments: [...filename],
    }

     console.log(data);

   


//for single object

let editdata={
    website:[],
    domain_id:[],
    attachments:[],
    stakeholders:[]

};

// if(values.website)
//    editdata.website.push(values.website)

// if(values.short_name)
//    editdata.short_name=values.short_name





if(values.company_name)
    editdata.company_name=values.company_name

if(values.onboarding_date)
    editdata.onboarding_date=values.onboarding_date

if(values.short_name)
    editdata.short_name=values.short_name

if(values.website)
    editdata.website.push(values.website)
if(stakeholders)
    editdata.stakeholders=stakeholders

if(domain_id)
    editdata.domain_id=domain_id

if(countryname.country_id)
    editdata.country_id=countryname.country_id

if(regionname.region_id)
    editdata.region_id=regionname.region_id

if(typelist.customer_type_id)
    editdata.customer_type_id=typelist.customer_type_id


    console.log(editdata);
       if(editdata.website.length==0)
           delete editdata.website
       if(editdata.attachments.length==0)
           delete editdata.attachments
       if(editdata.domain_id.length==0)
           delete editdata.domain_id
       if(editdata.stakeholders.length==0)
           delete editdata.stakeholders
    
           console.log(editdata);




        instance.put(`/customers/${props.location.state.cno}`, editdata)
        .then(res => {
         console.log(res);
        
            swal({
                title: "Done!",
                text: "Stakeholder Record Updated Successfully!",
                icon: "success",
                timer: 1000,
                button: false
            })
            props.history.push('/customer')
        })
        .catch(error => { console.log(error) })


 }
  
 
    

const handleChang = (event) => {
    setPersonName(event.target.value);
    // console.log(personName);
    
  };

  const handleClose =()=>{
    props.history.push('/customer')
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




    return (
        <div className="mainContent">
            <div className={classes.root}>
                <form >
                {/* <h3>Edit Customer</h3> */}
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
                                value={regionname}
                               
                                getOptionLabel={option => option.region_name}
                                onChange={(event, newValue) => {
                                        setregionname(newValue);
                                // setInputValue(newValue);
                                }}
                                inputRegion={inputRegion}
                                onInputChange={(event, newInputValue) => {
                                    // console.log(newInputValue);
                                    setInputRegion(newInputValue);
                                //setValue(newInputValue)
                                
                                }}
                                error
                                helperText="Incorrect entry."
                                renderOption={option => (
                                    <React.Fragment>
                                        {option.region_name}
                                    </React.Fragment>
                                )}
                                
                                style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                renderInput={params => <TextField 
                                     {...params} label="Region Name" required={true} InputLabelProps={{ shrink: true }} variant="outlined"
                                                                
                                                        />}
                            />


                            <Autocomplete
                               id="country"
                                options={countries}
                                 value={countryname}
                            //    inputValue={countryname}
                                getOptionLabel={option => option.country_name}
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    
                                    setcountryname(newValue);
                                
                                }}
                                //    inputValue={countryname}
                                inputCountryname={inputCountryname}
                                onInputChange={(event, newInputValue) => {
                                    // console.log(newInputValue);
                                    setCountryname(newInputValue);
                                
    
                                }}
                                renderOption={option => (
                                    <React.Fragment>
                                        {option.country_name}
                                    </React.Fragment>
                                )}
                                
                                style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                renderInput={params => <TextField {...params} label="Country Name"  value="abc" required={true} InputLabelProps={{ shrink: true }} variant="outlined"
                                                                // placeholder={countryname}
                                                        />}
                            />



{/* 
                                <Autocomplete
                                    id="Region"
                                    options={region1}      
                                    value={regionname}                                                                 
                                    getOptionLabel={option => option.label}
                                    onChange={(event,newValue)=>{
                                        setregionname(newValue)
                                    }}
                                    inputCname={inputCname}
                                    onInputChange={(event, newInputValue) => {
                                    setInputCname(newInputValue);
                                    //setValue(newInputValue)
                                    
                                    }}
                                   
                                        renderOption={option => (
                                            <React.Fragment>
                                                {option.label}
                                            </React.Fragment>
                                        )}
                                  
                                    // onChange={(event, newValue) => {
                                    //     setValue(newValue);
                                    // }}
                                   
                                    
                                    // onChange={(event, projectlist) => {
                                    //     setValues({ ...values, projectlist });
                                    // }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Region" variant="outlined" InputLabelProps={{ shrink: true }}  
                                                />}
                                /> */}
                                {/* 
                                old working
                                <Autocomplete
                                    id="Region"
                                    options={region1}      
                                    // defaultValue={region}                                                                 
                                    getOptionLabel={option => option.label}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={region}
                                    onInputChange={(event, newInputValue) => {
                                         setInputValue(newInputValue);
                                    }}
                                    // onChange={(event, projectlist) => {
                                    //     setValues({ ...values, projectlist });
                                    // }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Region" variant="outlined" InputLabelProps={{ shrink: true }}  
                                                />}
                                /> */}


                                



                                {/* 
                                old working country
                                <Autocomplete
                                //  defaultValue={v}
                                    id="country_name"
                                    options={countries}
                                    alue={values.}
                                    inputValue={countryname}
                                    getOptionLabel={option => option.name}
                                    
                                    // onChange={(event, projectlist) => {
                                    //     setValues({ ...values, projectlist });
                                    // }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Country Name" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                /> */}

                                <TextField 
                                   id="company"
                                    label="Company Name"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={props.location.state?props.location.state.companyname:"" }
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
                                    defaultValue={props.location.state?props.location.state.shortname:""}
                                    className={classes.textField}
                                    value={values.short_name}
                                    onChange={handleChange("short_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}

                                /> 

                                <Autocomplete
                                    
                                    id="c_type"
                                    options={types}
                                    value={typelist}
                                    // value={types}
                                    getOptionLabel={option=>option.customer_type_name}
        
                                    onChange={(event, newValue) => {
                                        settypelist(newValue);
                                // setInputValue(newValue);
                                }}
                                        // onInputChange={(event, newInputValue) => {
                                        //     setInputValue(newInputValue);
                                        //     }}
                                    inputCType={inputCType}
                                     onInputChange={(event, newInputValue) => {
                                    // console.log(newInputValue);
                                    setInputCType(newInputValue);
                                
    
                                }}
                                //setValue(newInputValue)
                                
                                     renderOption={option=> (
                                    <React.Fragment>
                                    {option.customer_type_name}
                                    </React.Fragment>
                                    )}
                                    style={{width:200,marginLeft:"35px",marginTop:"16px"}}
                                    renderInput={ params=> <TextField {...params} label="Customer Type"variant="outlined" InputLabelProps={{ shrink: true }}
                                    />}
                                    margin="normal"
                                    variant="outlined"
                                />
                               

                                <TextField
                                     id="website"
                                    label="Website"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={props.location.state?props.location.state.websitelist:""}
                                    className={classes.textField}
                                    value={values.website}
                                    
                                    onChange={handleChange("website")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:430,marginLeft:"35px"}}
                                />
                            </div>
                            <div style={{ display: "inline-flex"}}>
                                
                            {/* <Autocomplete
                                    multiple
                                    id="Domains List"
                                    options={domains}
                                    getOptionLabel={option=>option.name}
                                    inputValue={domainlist}
                                    onChange={(event,domainsData)=>
                                        {
                                        setValues({...values,domainsData});
                                        } }
                                    renderOption={option=> (
                                    <React.Fragment>
                                    {option.name}
                                    </React.Fragment>
                                    )}
                                    style={{width:200,marginLeft:"35px",marginTop:"16px"}}
                                    renderInput={ params=> <TextField {...params} label="Select Domains"variant="outlined" InputLabelProps={{ shrink: true }}
                                    />}
                                    margin="normal"
                                    variant="outlined"
                                /> */}
                                <FormControl variant="outlined" className={classes.formControl}>
                                     <InputLabel id="demo-mutiple-checkbox-label" style={{marginLeft:"35px",marginTop:"10px"}}>Domain </InputLabel>
                                     <Select
                                    variant="filled"
                                    required
                                    style={{width:200,marginLeft:"35px",marginTop:"16px",borderStyle:"bold",height:"50px"}}
                                    labelId="demo-mutiple-checkbox-label"
                                    id="domain"
                                    multiple
                                    // value={newdomainlistnames}
                                    displayEmpty
                                    onChange={handleChang}
                                    defaultValue={newdomainlistnames}
                                    input={<Input required={true} />}
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
                                   
                                    {newdomainlistnames.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    {/* {domain_list.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))} */}
                                    </Select>
                             
                               {/* <Select
                               variant="filled"
                                    required
                                    style={{width:200,marginLeft:"35px",marginTop:"16px",borderStyle:"bold",height:"50px"}}
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={domainidlist}
                                    displayEmpty
                                    onChange={handleChang}
                                    defaultValue={newdomainlistnames}
                                    input={<Input required={true} />}
                                    //   InputLabelProps={{ minlength:1 }} 
                                    renderValue={(selected) => 
                                        {
                                        // console.log(selected)
                                        
                                        selected.join(",")
                                    }
                                    }
                                    MenuProps={MenuProps}
                                    >
                                    <MenuItem value="">
                                        <em>select the value</em>
                                    </MenuItem>
                                   
                                     {domain_list.map((name) => (
                                        <MenuItem key={name} value={name.slice(1)}>
                                        <Checkbox checked={personName.indexOf(name.slice(1)) > -1} />
                                        <ListItemText primary={name.slice(1)} />
                                        </MenuItem>
                                    ))} 
                                    {newdomainlistnames.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select> */}
                                    </FormControl>

                                    
                                <TextField
                                     id="date"
                                    label="Onboarding Date"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    inputProps={{ max:currentdate }}
                                    className={classes.textField}
                                    value={values.start_date}
                                    defaultValue={props.location.state?props.location.state.date:""}
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

                        <div style={{height:"50%"}}>
                            
                            
                          {editform ?
                          
                        //   <TextField
                        //             id="outlined-name"
                        //             label="Contact Name Update"
                        //             InputLabelProps={{ shrink: true }}
                        //             // defaultValue={contactname ? contactname:"abc"}
                        //             defaultValue={currentStakeholder?currentStakeholder.contact_name:"abc"}
                        //             // value={currentStakeholder.contactname}
                        //             className={classes.textField}
                        //             // value={values.contact_name}
                                    
                        //             onChange={handleChange("contact_name")}
                        //             margin="normal"
                        //             variant="outlined"
                        //             style={{width:200,marginLeft:"35px"}}
                        //         />
                        <UpdatePerson 
                        // // editing={editing} setEditing={setEditing} 
                        currentStakeholder={currentStakeholder}
                        updateStakeholderlist={updateStakeholderlist}
                        // //  updatePerson={updatePerson}
                         />

                          :
                          <div>
                              <form id="add_form">
                              <div style={{ display: "inline-flex"  }}>
                            <TextField
                                    id="scontact"
                                    label="Contact Name"
                                    InputLabelProps={{ shrink: true }}
                                    // defaultValue={currentStakeholder.contactname ? currentStakeholder.contactname:"abc"}
                                    // defaultValue={currentStakeholder? currentStakeholder.contact_name:"abc"}
                                    className={classes.textField}
                                    // value={values.start_date}
                                    // value={currentStakeholder? currentStakeholder.contact_name:"abc"}
                                    onChange={handleChange("add_contact_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />
                            
                                <TextField
                                    id="stitle"
                                    label="Title"
                                    InputLabelProps={{ shrink: true }}
                                    
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("add_title")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />

                                <TextField
                                    id="srepmgr"
                                    label="Reporting Manager"
                                    InputLabelProps={{ shrink: true }}
                                    
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("add_reporting_manager")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />  
                                <TextField
                                     id="sno"
                                    label="Contact Number"
                                    InputLabelProps={{ shrink: true }}
                                    type="number"
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("add_contact_number")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                    onInput = {(e) =>{
                                        e.target.value = Math.max(0, parseInt(e.target.value)<10000000000?parseInt(e.target.value):e.target.value ).toString().slice(0,10)
                                    }}
                                /> 


                           
                            </div>
 

                            <div style={{ display: "inline-flex"}}>

                              
                                <Autocomplete
                                     id="sevalrol"
                                    options={evalution_role}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option}
                                    onChange={(event, add_evaluation_role) => {
                                        setValues({ ...values, add_evaluation_role });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Evaluation Role" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                 <Autocomplete
                                    id="spref"
                                    options={preference}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option}
                                    onChange={(event, add_preference) => {
                                        setValues({ ...values, add_preference });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Preference" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                <Autocomplete
                                    id="sinflu"
                                    options={influence}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option}
                                    onChange={(event, add_influence) => {
                                        setValues({ ...values, add_influence });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:150,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Influence" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                               
                                <Autocomplete
                                    id="sinfpow"
                                    options={influence_power}
                                    //defaultValue={values.}
                                    
                                    getOptionLabel={option => option}
                                    onChange={(event, add_influence_power) => {
                                        setValues({ ...values, add_influence_power });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:100,marginTop:"16px",marginLeft:"25px"}}
                                    renderInput={params => <TextField {...params} label="Influence Power" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                <TextField
                                    id="scove"
                                    label="Coveraage"
                                    InputLabelProps={{ shrink: true }}
                                    
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("add_coverage")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:140,marginLeft:"25px"}}
                                />  

                                                               
                            </div>
 
                            <div style={{display:"flex"}}>
                                
                            

                                <TextField
                                    id="semail"
                                    label="Email ID"
                                    InputLabelProps={{ shrink: true }}
                                    
                                    className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("add_email")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:440,marginLeft:"35px"}}
                                />  


                                
                                <Button id="addstak" className={classes.button} style={{height:40,marginLeft:"27%",marginTop:"25px"}} variant="contained"
                                                    onClick={addStakeholder}>
                                                    ADD Stakeholder
                                </Button> 
                                
                            </div>
                            </form>
                            </div>
}
                            <br></br>
                            <div style={{display:"flex" ,marginLeft:"2px"}}>
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
                        <Typography id="stake"><b>Attachments</b></Typography>
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
                           <div style={{height:"50%",width:"100%"}}>
                           {/* <DropzoneArea
                                acceptedFiles={[]}
                                showPreviews={true}
                                maxFileSize={500000000000000000}
                                showPreviewsInDropzone={false}
                                showFileNamesInPreview={true}
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
                                 previewText="Your Files"
                                // previewText="Files"
                                // dropzoneClass={classes.DropzoneArea}
                                useChipsForPreview={true}
                                initialFiles={attachments}
                                onChange={handleChange1.bind("file")}
                            />
                           </div>
                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
               

         
            <div style={{ float: "right" }}>
                <Button id="cancel" className={classes.button} variant="contained" onClick={()=>handleClose()}>Cancel</Button>
                <Button id="save" className={classes.button} style={{ marginLeft: "30px" }} variant="contained" onClick={(e)=>handleSubmit(e)}>Save</Button>
            </div>
            </form>
        </div>
        </div>
    )
}

const UpdatePerson = (props) => {
    console.log(props);
    
    const classes = useStyles();
    const [values, setValues] =useState([]);
    const [person, setPerson] = useState(props.currentStakeholder);
    //Using Effect hook 
    React.useEffect(
      () => {
        setPerson(props.currentStakeholder);
      },
      [props]
    );
  
    const updateStakeholder=()=>{
        console.log("update");
        console.log(values);
        console.log(person);
        
         props.updateStakeholderlist(person.id,values)
        
        
    }
    const handleInputChange = event => {
      const { name, value } = event.target;
      setPerson({ ...person, [name]: value });
    };
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
  console.log(person);
  
    return (
    //   <form className="MyForm"  >
    //       <TextField
    //                                 id="outlined-name"
    //                                 label="Contact Name Update"
    //                                 InputLabelProps={{ shrink: true }}
    //                                 // defaultValue={contactname ? contactname:"abc"}
    //                                 defaultValue={person.contact_name}
    //                                 // value={currentStakeholder.contactname}
    //                                 // className={classes.textField}
    //                                 // value={currentStakeholder.contactname}
                                    
    //                                 // onChange={handleChange("contact_name")}
    //                                 margin="normal"
    //                                 variant="outlined"
    //                                 style={{width:200,marginLeft:"35px"}}
    //                             />
    //   </form>


    <div style={{height:"50%"}}>
                            <div style={{ display: "inline-flex"  }}>
                     
                            <TextField
                                    id="scontact"
                                    label="Contact Name Update"
                                    InputLabelProps={{ shrink: true }}
                                    // defaultValue={contactname ? contactname:"abc"}
                                    defaultValue={person.contact_name}
                                    // value={currentStakeholder.contactname}
                                    // className={classes.textField}
                                    // value={currentStakeholder.contactname}
                                    
                                    onChange={handleChange("updated_contact_name")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />
                            
                                <TextField
                                    id="stitle"
                                    label="Title update"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={person.title}
                                    // className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("updated_title")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />

                                <TextField
                                    id="srepmgr"
                                    label="Reporting Manager update"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={person.reporting_manager}
                                    // className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("updated_reporting_manager")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                />  
                                <TextField
                                    id="sno"
                                    label="Contact Number update "
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={person.contact_number}
                                    type="number"
                                    // className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("updated_contact_number")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:200,marginLeft:"35px"}}
                                    onInput = {(e) =>{
                                        e.target.value = Math.max(0, parseInt(e.target.value)<10000000000?parseInt(e.target.value):e.target.value ).toString().slice(0,10)
                                    }}
                                /> 

                               
                               
                            </div>

                            <div style={{ display: "inline-flex"}}>

                              
                                <Autocomplete
                                    id="sevalrol"
                                    options={evalution_role}
                                    defaultValue={person.evaluation_role}

                                    
                                    getOptionLabel={option => option}
                                    onChange={(event, evalutionrole) => {
                                        setValues({ ...values, evalutionrole });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Evaluation Role update" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                 <Autocomplete
                                    id="spref"
                                    options={preference}
                                    //defaultValue={values.}
                                    defaultValue={person.preference}
                                    getOptionLabel={option => option}
                                    onChange={(event, preference) => {
                                        setValues({ ...values, preference });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:200,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Preference" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                <Autocomplete
                                    id="sinflu"
                                    options={influence}
                                    //defaultValue={values.}
                                    defaultValue={person.influence}
                                    getOptionLabel={option => option}
                                    onChange={(event, influence) => {
                                        setValues({ ...values, influence });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:150,marginTop:"16px",marginLeft:"35px"}}
                                    renderInput={params => <TextField {...params} label="Influence" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                               
                                <Autocomplete
                                    id="sinfpow"
                                    options={influence_power}
                                    //defaultValue={values.}
                                    defaultValue={person.influencing_power}
                                    getOptionLabel={option => option}
                                    onChange={(event, influencepower) => {
                                        setValues({ ...values, influencepower });
                                    }}
                                    // renderOption={option => (
                                    //     <React.Fragment>
                                    //         <b>{option.id}</b>&emsp;{option.name}
                                    //     </React.Fragment>
                                    // )}
                                    style={{width:100,marginTop:"16px",marginLeft:"25px"}}
                                    renderInput={params => <TextField {...params} label="Influence Power" variant="outlined" InputLabelProps={{ shrink: true }}/>}
                                />
                                <TextField
                                    id="scove"
                                    label="Coveraage update"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={person.coverage}
                                    // className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("updated_coverage")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:140,marginLeft:"25px"}}
                                />  

                            </div>
                            <div style={{display:"flex"}}>
                                
                            

                                <TextField
                                    id="semail"
                                    label="Email ID update"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={person.email_id}
                                    // className={classes.textField}
                                    // value={values.start_date}
                                    
                                    onChange={handleChange("updated_email")}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:440,marginLeft:"35px"}}
                                />  


                                
                                <Button 
                                id="addstak"
                                className={classes.button}
                                 style={{height:40,marginLeft:"27%",marginTop:"25px"}} variant="contained"
                                 onClick={()=>updateStakeholder()}>
                                                    Update Stakeholder
                                </Button> 
                            </div>
                            </div>
    );
  };
  
export default EditCustomer;