import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import instance from '../../common/instance';
import MUIDataTable from "mui-datatables";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PeopleIcon from '@material-ui/icons/People';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import ReactSearchBox from 'react-search-box';
import PeopleList from './ListPeople';
import CircularProgress from '@material-ui/core/CircularProgress';


const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: "#FFF",
        //  display: table-cell,
       fontWeight:"bold",
       marginLeft:'10px'
       
      }
    },
    MuiTableCell: {
      root: {
        marginLeft: "50px",
        //backgroundColor: "#FFF",
        display: "table-cell",
        padding: "0"
      }
    },
   
    MuiTableSortLabel: {
      active: {
        //marginLeft:"3px",
        marginTop: "8px",

        // backgroundColor: 'green' // your color here
      },
      MuiIconButton: {
        padding: "10px"
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



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: '20px',
    //maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
  },
  textField: {
    marginLeft: 0,
    backgroundColor: "red"

  },
  button: {
    marginTop: 23,
    fontSize: "15px",
    background: "linear-gradient(160deg,#da303e,#e23341,#eb3644,#f43947,#e94c51,#ca6460,#a8736f,#7f7f7f)",
  },

}));

const dummyData = [
  {
    "id": 1,
    "status": "started",
    "project_name": "Project A",
    "proj_manager": "PM1",
    "du_head":"DU_Head1",
    "project_type": "Type 1",
    "customer_name": "client1",
    "du_manager": "DU Manager1",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "USA",
    "unit_details": ""
  },
  {
    "id": 2,
    "status": "started",
    "project_name": "Project B",
    "proj_manager": "PM1",
    "du_head":"DU_Head2",
    "project_type": "Type 1",
    "customer_name": "client1",
    "du_manager": "DU Manager2",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "USA",
    "unit_details": ""
  },
  {
    "id": 3,
    "status": "started",
    "project_name": "Project A",
    "proj_manager": "PM1",
    "du_head":"DU_Head1",
    "project_type": "Type 2",
    "customer_name": "client2",
    "du_manager": "DU Manager1",
    "start_date": "23/02/2020",
    "end_date": "23/02/2022",
    "du_details": "",
    "region": "USA",
    "unit_details": ""
  },

  {
    "id": 4,
    "status": "onHold",
    "project_name": "Project C",
    "proj_manager": "PM2",
    "du_head":"DU_Head2",
    "project_type": "Type 3",
    "customer_name": "client3",
    "du_manager": "DU Manager2",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "",
    "unit_details": ""
  },
  {
    "id": 5,
    "status": "onHold",
    "project_name": "Project D",
    "proj_manager": "PM2",
    "du_head":"DU_Head2",
    "project_type": "Type 1",
    "customer_name": "client1",
    "du_manager": "DU Manager2",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "",
    "unit_details": ""
  },
  {
    "id": 6,
    "status": "stopped",
    "project_name": "Project A",
    "proj_manager": "PM1",
    "du_head":"DU_Head1",
    "project_type": "Type 1",
    "customer_name": "client2",
    "du_manager": "DU Manager1",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "",
    "unit_details": ""
  },
  {
    "id": 7,
    "status": "stopped",
    "project_name": "Project B",
    "proj_manager": "PM3",
    "du_head":"DU_Head2",
    "project_type": "Type 4",
    "customer_name": "client3",
    "du_manager": "DU Manager2",
    "start_date": "",
    "end_date": "",
    "du_details": "",
    "region": "",
    "unit_details": ""
  },

]


const ProjectList = (props) => {

  const classes = useStyles();
  
  
  const columns = [

    {
      label: "Id",
      name: "id",
      options: {
        display: false,
        sortDirection:'desc'
      }
    },
    {
      label: "",
      name: "",
      options: {
        sort:false,

        customBodyRender: (value, tableMeta) => {

          // console.log(value);

          if (value === "Active") 
            return (
              <FiberManualRecordIcon fontSize="small" style={{ color: "green" }}></FiberManualRecordIcon>
              // <h2>hi</h2>
            );
          else if (value === "onHold")
            return (
              <PauseCircleFilledRoundedIcon fontSize="small"></PauseCircleFilledRoundedIcon>
            );
          else if (value === "Inactive")
            return (

              <FiberManualRecordIcon fontSize="small" style={{ color: "red" }}></FiberManualRecordIcon>
            );
        }
      }


    },
    {
      label: "Project Name",
      name: "project_name",
      //   options: {
      //     sortDirection:'desc'
      // }
    },

    {
      label: "Project Manager",
      name: "proj_manager",
      //   options: {
      //     sortDirection:'asc'
      // }

    },
    {
      label: "DU Head",
      name: "du_head",

    },
    {
      label: "Project Type",
      name: "project_type",

    },
    {
      label: "Customer Name",
      name: "customer_name",

    },
    // {
    //   label: "DU Manager",
    //   name: "du_manager",

    // },
    {
      label: "Start Date",
      name: "start_date",
    //   options: {
    //     display:false
    // }

    },
    {
      label: "End Date",
      name: "end_date",
      //   options: {
      //     display:false
      // }
    },
    {
      label: "Sow Start Date",
      name: "sow_start_date",
        options: {
          display:false,
          
      }
    },
    
    {
      label: "Sow End Date",
      name: "sow_end_date",
        options: {
          display:false
      }
    },
    
    {
      label: "DU Name",
      name: "du_name",
        options: {
          display:false
      }
    },
  
    // {
    //   label: "DU Details",
    //   name: "du_details",
    //   //   options: {
    //   //     display:false
    //   // }
    // },
    // {
    //   label: "Region",
    //   name: "region",
    //     options: {
    //       display:false
    //   }
    // },
    // {
    //   label: "Unit Details",
    //   name: "unit_details",
    //     options: {
    //       display:false
    //   }
    // },

    {
      label: "",
      options: {

        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          const rowId = tableMeta.rowData;
         // console.log(rowId);
         // console.log(rowId[1])
        //console.log(rowId[0])
          if (rowId[1] === "Active" || rowId[1] === "onHold") {
            return (
              <div>
                <IconButton>
                  <EditIcon onClick={() =>props.history.push({pathname: '/editproject', state: { pid: rowId[0], status:rowId[1],du:rowId[11], project_startDate:rowId[7],project_endDate:rowId[8], sow_startDate:rowId[9],sow_endDate:rowId[10]}})} />
                </IconButton>

                <IconButton>
                  <PeopleIcon  onClick={() => { handleClickOpen(rowId[0]) }}/>
                </IconButton>

                
              </div>
            )
          }
          else {
            return (
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            )
          }

        }

      },
    },

  ];
  let isLoading = true;
  const[load,setload]=useState(true)
  setTimeout(() => {
    //    console.log("hhhiiii");
    //    swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, You will not be able to recover Record!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // })
    setload(false)
     }, 5000)
  const options = {
    selectableRows: false,   //no checkbox
    filterType: "dropdown",  //filter on columns
    // responsive: "scroll",    //scrollbar
    // pagination	:false,
    viewColumns: false,
    download: true,
    print: false,
    elevation: 0,
    

      textLabels: {
      body: {
      noMatch:isLoading ?
      noMatch:load ?
      //  setTimeout(() => {
      //    console.log("hhhiiii");
      //    swal({
      //     title: "Are you sure?",
      //     text: "Once deleted, You will not be able to recover Record!",
      //     icon: "warning",
      //     buttons: true,
      //     dangerMode: true,
      // })
         
      //  }, 5000)
      
            <CircularProgress color="secondary" />
          
            :
            'Sorry, there is no data to display',
            },
      },


  };

const[projects,setProjects]=useState([]);


let responseData=[];
  let projectData=[]; 
  useEffect(()=>{
      console.log("Getting users");
      instance.get('/projects/')
      .then(response => {
        console.log(response);
      
        for(const key in response.data){
            projectData.push({
            id: response.data[key].project_id,
            du_name:response.data[key].delivery_units[0].du_name,
            du_head:response.data[key].delivery_units[0].employees[0].display_name,
            customer_name: response.data[key].customer[0].company_name,
            project_start_date: response.data[key].project_start_date.slice(0,10),
            project_end_date:response.data[key].project_end_date,
            sow_start_date: response.data[key].sow_start_date.slice(0,10),
            sow_end_date:response.data[key].sow_end_date.slice(0,10),
            project_name: response.data[key].project_name,
            description: response.data[key].description,
            sez_unit:response.data[key].sez[0].sez_unit_name,
            project_manager:response.data[key].employees[0].display_name,
            project_type: response.data[key].project_type[0].project_type_name,
            status:response.data[key].status,
              
          })
        }
       
        setProjects(projectData)
      })
    
  },[])


  
  const[list,setList]=useState([]);
  const[open,setOpen]= useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setList(dummyData.filter(data=>data.id === id))
};

const handleClose = () =>{
  setOpen(false);
}



  let datalist = [];

  let activeData = projects.filter(data => data.status == "Active")
  // console.log(activeData);
  let inactiveData = projects.filter(data => data.status == "Inactive")
  // console.log(inactiveData);
  let pausedData = projects.filter(data => data.status == "onHold")
  // console.log(pausedData);

  //for started project 

  activeData.forEach((p) => {

    //  console.log("found");
    const data = [];
    //const data_inactive = [];
    //console.log(e.employee_id);

    while (p.status === "Active") {

      data.push(p.id);
      data.push(p.status);
      data.push(p.project_name);
      data.push(p.project_manager);
      data.push(p.du_head);
      data.push(p.project_type);
      data.push(p.customer_name);
      // data.push(p.du_manager);
      data.push(p.project_start_date);
      // data.push(p.project_end_date);
      if(p.project_end_date===null){
        data.push(p.project_end_date);
      }
        else{
          data.push(p.project_end_date.slice(0,10));
        }

      data.push(p.sow_start_date);
      data.push(p.sow_end_date);
      data.push(p.du_name);
      // data.push(p.unit_details);
      datalist.push(data);
      break;

    }
  });

  //For paused project

  pausedData.forEach((p) => {

    //  console.log("found");
    const data = [];
  
    while (p.status === "onHold") {

      data.push(p.id);
      data.push(p.status);
      data.push(p.project_name);
      data.push(p.project_manager);
      data.push(p.du_head);
      data.push(p.project_type);
      data.push(p.customer_name);
      // data.push(p.du_manager);
      data.push(p.project_start_date);
      // data.push(p.project_end_date);
      if(p.project_end_date===null){
        data.push(p.project_end_date);
      }
        else{
          data.push(p.project_end_date.slice(0,10));
        };
        data.push(p.sow_start_date);
        data.push(p.sow_end_date);
        data.push(p.du_name);
      // data.push(p.unit_details);
      datalist.push(data);
      break;

    }
  });

  //for stopped project

  inactiveData.forEach((p) => {

    //  console.log("found");
    const data = [];

    while (p.status === "Inactive") {

      data.push(p.id);
      data.push(p.status);
      data.push(p.project_name);
      data.push(p.project_manager);
      data.push(p.du_head);
      data.push(p.project_type);
      data.push(p.customer_name);
      // data.push(p.du_manager);
      data.push(p.project_start_date);
      //data.push(p.project_end_date);
      if(p.project_end_date===null){
        data.push(p.project_end_date);
      }
        else{
          data.push(p.project_end_date.slice(0,10));
        }
        data.push(p.sow_start_date);
      data.push(p.sow_end_date);
      data.push(p.du_name);
     
      // data.push(p.du_details);
      // data.push(p.region);
      // data.push(p.unit_details);
      datalist.push(data);
      break;

    }
  });
  
 
  const[edit,setEdit] = useState([])
  const handleEdit=(id)=>{
  
  console.log(id);
  setEdit(id);
  console.log(edit);
    props.history.push({
      pathname: '/editproject',
    
      
      state: { edit: edit }
    })
  }
console.log(datalist);
  
  return (
    <div className="mainContent">
      <Button className={classes.button} variant="contained" onClick={() => props.history.push('/addproject')} >
        Add Project 
      </Button>

      <div className={classes.root}>

        <MuiThemeProvider theme={getMuiTheme()}>

          <MUIDataTable

            data={datalist}
            columns={columns}
            options={options}

          />
        </MuiThemeProvider>
      </div>
      <PeopleList open={open} handleClose={handleClose} list={list}/>
    </div>

  )

}

export default ProjectList;