import React, { useState,useEffect,Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MUIDataTable from "mui-datatables";
import { Button, Grid, Chip, Paper, TextField } from '@material-ui/core';
import Done from "@material-ui/icons/Done";
import RA from './ResourceAllocation'
import AddResourceAllocation from './AddResourceAllocation';
import instance from './../../common/instance';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
    textField: {
        textAlign: "center",
        padding: "10px",
        // borderRadius:"25px",

    },


}));

const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          backgroundColor: "#FFF",
          //  display: table-cell,
          padding: "12px"
        }
      },
      MuiTableSortLabel: {
        active: {
          marginTop: "8px",
  
          // backgroundColor: 'green' // your color here
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
    //   MuiDataTableHeadCell: {
    //     root: {
    //     //  backgroundColor : 'rgb(127,127,127)',
    //     //  display: table-cell,
    //       // padding:"7px"
    //     }
    //   }
    }
  })
  

// const projectData = [
//     {
//         "id": 1,
//         "project_name": "Project 1",
//         "proj_manager": "Manager 1",
//         "allocation": "50",
//         "role": "Tester",
//         "billability_status": "Status 1",
//         "billabilty_sub_status": "Sub-Status 1",
//         "start_date": "10-03-2020",
//         "end_date": "20-04-2020",
//         "department": "P&D",
//         "delivery_unit": "DU1"
//     },
//     {
//         "id": 2,
//         "project_name": "Project 2",
//         "proj_manager": "Manager 2",
//         "allocation": "50",
//         "role": "Developer",
//         "billability_status": "Status 2",
//         "billabilty_sub_status": "Sub-Status 2",
//         "start_date": "10-03-2020",
//         "end_date": "20-04-2020",
//         "department": "P&D",
//         "delivery_unit": "DU2"
//     },
//     {
//         "id": 3,
//         "project_name": "Project 3",
//         "proj_manager": "Manager 3",
//         "allocation": "50",
//         "role": "Database",
//         "billability_status": "Status 3",
//         "billabilty_sub_status": "Sub-Status 3",
//         "start_date": "10-03-2020",
//         "end_date": "20-04-2020",
//         "department": "P&D",
//         "delivery_unit": "DU3"
//     }
// ]




const RADetails = (props) => {
    const classes = useStyles();

    console.log(props);
    
    const[open,setOpen]=useState(false);

    const[list, setList] = useState([]);
    const [person, setPerson] = useState(props.currentPerson);

    let projects = [];
  useEffect(
    () => {
      setPerson(props.currentEmployee);

   
    instance.get(`/Resource_Allocation/emp/${props.currentEmployee.employee_id}`)
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
        },
    [props]
  );


    const [primarySkill, setPrimarySkills] = useState([
        { key: 0, label: 'Data Warehousing' },
        { key: 1, label: 'Extract, Transform, Load (ETL)' },
        // { key: 2, label: 'Angular' },
        // { key: 3, label: 'Veu JS' },
        // { key: 4, label: 'React JS' },

    ]);

    const [secSkill, setSecSkills] = useState([
        { key: 0, label: 'ASP.NET' },
        { key: 1, label: 'Databases' },
        { key: 2, label: 'Teradata' },
    ]);

    const [training, setTraining] = useState([
        { key: 0, label: 'Data Modeling' },
        { key: 1, label: 'Visual Studio' },
    ]);

    const [cerificates, setCertificates] = useState([
        { key: 0, label: 'ISTQB' },
        { key: 1, label: 'Agile Project Management' },
    ]);


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
        responsive: "scroll",
        download: false,
        print: false,
        selectableRows: false,
        viewColumns: false,
        filter: false,
        pagination: false,
        elevation: 0,
        search:false
        
    };
    
    //console.log(projectData);
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
        // data.push(project.department);
        data.push(project.delivery_unit);

        projectList.push(data);

    });
    //console.log(projectList);


    const handleClickOpen = () => {
        //console.log(datalist);
        // console.log(empid);
    
        setOpen(true);
    
    
      };

      const handleClose = () =>{
          setOpen(false);
      }
    return (
    //    <Fragment>
            <div >
            {/*<b> RA Details </b>  */}
            {/* <h3>Employee Name :  Akash Lakade</h3> */}
            <label for="employee_name" style={{ fontSize: "large", fontWeight: "bold" }}>Employee Name</label>
            <input style={{ width: "30%" }}
                required
                id="employee_name"
                className={classes.textField}
                style={{ marginLeft: "100px" }}
                value={props.currentEmployee.employee_name}
                margin="normal"
                variant="outlined"
                disabled
            />
            <br></br><br></br>

            <div className={classes.root}>
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
                        <Typography ><b>Project History</b></Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography >
                        <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable
                                title={""}
                                data={projectList}
                                columns={columns}
                                options={options}
                            />
                            </MuiThemeProvider>

                            <Button className={classes.button} variant="contained" color="primary" onClick={() => handleClickOpen()} >
                                New Allocation
                            </Button>

                        </Typography>
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
                        <Typography><b>Skill Set</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <Grid className={classes.grid} container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography ><b>Primary Skills</b></Typography>
                                    <Paper className={classes.paper} elevation={0}>
                                        {primarySkill.map((data) => {
                                            return (
                                                <Typography key={data.key}>
                                                    <Chip
                                                        label={data.label}
                                                        className={classes.chip}
                                                    //  icon={<Done />} 
                                                    //color="primary"
                                                    />
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography ><b>Secondary Skills</b></Typography>
                                    <Paper className={classes.paper} elevation={0}>
                                        {secSkill.map((data) => {
                                            return (
                                                <Typography key={data.key}>
                                                    <Chip
                                                        label={data.label}
                                                        className={classes.chip}
                                                    //  icon={<Done />} 
                                                    // color="primary"
                                                    />
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography ><b>Trainings Completed</b></Typography>
                                    <Paper className={classes.paper} elevation={0}>
                                        {training.map((data) => {
                                            return (
                                                <Typography key={data.key}>
                                                    <Chip
                                                        label={data.label}
                                                        className={classes.chip}
                                                    //icon={<Done />} 
                                                    //color="primary"
                                                    />
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography ><b>Certifications</b></Typography>
                                    <Paper className={classes.paper} elevation={0}>
                                        {cerificates.map((data) => {
                                            return (
                                                <Typography key={data.key}>
                                                    <Chip
                                                        label={data.label}
                                                        className={classes.chip}
                                                    //icon={<Done />} 
                                                    // color="primary"
                                                    />
                                                </Typography>
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                            </Grid>
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
                        <Typography ><b>Personal Details</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Paper elevation={0}>
                            <table>
                                <tr>
                                    <td>
                                        <label for="employeeId">Employee ID</label>
                                        <input style={{ width: "30%" }}
                                            required
                                            id="employeeId"
                                            className={classes.textField}
                                            style={{ marginLeft: "100px" }}
                                             value={props.currentEmployee.employee_id}
                                            margin="normal"
                                            variant="outlined"
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <label for="designation" style={{ marginLeft: "150px" }}>Designation</label>
                                        <input
                                            disabled
                                            id="designation"
                                            className={classes.textField}
                                            style={{ marginLeft: "100px" }}
                                            value={props.currentEmployee.designation}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </td>
                                </tr>
                                <br></br>
                                <tr>
                                    <td>
                                        <label for="role">Role</label>
                                        <input
                                            id="role"
                                            className={classes.textField}
                                            style={{ marginLeft: "152px" }}
                                            value="Manager"
                                            margin="normal"
                                            variant="outlined"
                                            disabled
                                        />
                                    </td>
                                    <td>
                                        <label for="joining_date" style={{ marginLeft: "147px" }}>Joining Date</label>
                                        <input
                                            id="joining_date"
                                            className={classes.textField}
                                            style={{ marginLeft: "100px" }}
                                            value="16/12/2019"
                                            margin="normal"
                                            variant="outlined"
                                            disabled
                                        />
                                    </td>
                                </tr>
                            </table>

                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
            <AddResourceAllocation open={open} handleClose={handleClose} />
        </div>
    //    </Fragment>
    )
}

export default RADetails;