import React, { Fragment, useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableCell } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import AddNewProject from './../AddProject/AddNewProject';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from '../../common/instance';
import AddEmpToProject from './AddEmpToProject';
import EditProjectDashboard from './EditProjectDashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import swal from 'sweetalert';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddSow from "./AddSow";


function createData(
    bu,
    empName,
    designation,
    skills,
    YOE) {
    return { bu, empName, designation, skills, YOE };
}

const rows = [
    createData(
        "Unit 1",
        "10/12/2020",
        "10/12/2020",
        "01/02/2020",
        "01/02/2020",

    ),
    createData(
        "Unit 2",
        "10/12/2020",
        "10/12/2020",
        "01/02/2020",
        "01/02/2020",


    ),
    createData(
        "Unit 1",
        "10/12/2020",
        "10/12/2020",
        "01/02/2020",
        "01/02/2020",

    )
];


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // width: '100%',
        maxWidth: 600,
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
}));



const ProjectDashboard = () => {
    const columnsSow = [

        {
            label: "Id",
            name: "id",
            options:{
                display:false,
            }

        },
        {
            label: "Project ",
            name: "proj_id",
            options: {
                display: false
            }


        },
        {
            label: "File Name",
            name: "file_name",

        },
        {
            label: "Documents",
            name: "documents",
            options: {
                display: false
            }
        },
        {
            label: "Actions",
            options: {

                filter: false,
                sort: false,
                empty: true,
                // onRowClick:(rowData) => {console.log(rowData)},
                //  onCellClick: (rowIndex) => {this.handleEdit(rowIndex)},
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;
                    console.log(rowId[2]);
                    console.log(rowId[3])
                    return (
                        <div>
                            <IconButton>
                                <GetAppIcon color="primary" />
                            </IconButton>


                        </div>

                    )
                }

            },
        }
    ];

    const columns = [

        {
            label: "Id",
            name: "id",
            options: {
                 display:false
            }


        },
        {
            label: "Employee Name",
            name: "emp_id",

        },
        {
            label: "Technology Name",
            name: "tech_id",

        },
        {
            label: "Project Name",
            name: "proj_id",

        },
        {
            label: "Role ",
            name: "role_id",

        },
        {
            label: "Status",
            name: "status",

        },
        {
            label: "Allocation",
            name: "allocation",

        },
        {
            label: "Utilization ",
            name: "utilization",

        },
        {
            label: "Actions",
            options: {

                filter: false,
                sort: false,
                empty: true,
                // onRowClick:(rowData) => {console.log(rowData)},
                //  onCellClick: (rowIndex) => {this.handleEdit(rowIndex)},
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;

                    //console.log(rowId[0])
                    return (
                        <div>
                            {/* <IconButton onClick={() => handleClickOpen(rowId[0])}>
                      <VisibilityIcon  color="primary" />
                  </IconButton> */}
                            <IconButton onClick={() => { handleClickDelete(rowId[0]) }}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                            <IconButton onClick={() => handleClickOpenEdit(rowId[0])} >
                                <EditIcon style={{ color: 'blue' }} disabled />
                            </IconButton>
                            {/* <IconButton >
                      <DeleteIcon color="secondary"/>
                  </IconButton> */}

                        </div>

                    )
                }

            },
        }
    ];
    const classes = useStyles();
    // const instance = axios.create({
    //     baseURL: 'http://10.21.18.59:5200/api/' 
    // });
    const [project, setProject] = useState([]);
    const [ra, setra] = useState([]);
    const [values, setValues] = React.useState({ projectlist: " " });
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [enable, setenable] = React.useState(false);
    const [view, setView] = React.useState([]);
    const [row, setrow] = useState([]);

    const [empidlist,setempidlist]=useState([]);

    let projectInfo = [];
    let RAInfo = [];

    useEffect(() => {
        console.log("Getting users");

        //for selecting projects
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
                        // project_type_one: response.data[key].project_type_one,
                        // project_type_two: response.data[key].project_type_two,
                        // project_type_three: response.data[key].project_type_three,
                    })


                }
                setProject(projectInfo)
                // console.log(projectInfo)
            })
            .catch(error => { console.log(error) })




        //     instance.get('/Resource_Allocation/')
        //     .then(response => {
        //          console.log(response)

        //         for (const key in response.data) {
        //             RAInfo.push({
        //                 id:response.data[key].id,
        //                 emp_id: response.data[key].emp_id,
        //                 employees_display_name:response.data[key].employees[0].display_name,

        //                 tech_id: response.data[key].tech_id,
        //                 technology_name:response.data[key].technology[0].name,

        //                 proj_id: response.data[key].proj_id,
        //                 project_name:response.data[key].project[0].name,

        //                 role_id: response.data[key].role_id,
        //                 roles_name:response.data[key].roles[0].role_title,

        //                 status: response.data[key].status,
        //                 // percentage: response.data[key].percentage,
        //                 utilization: response.data[key].utilization,
        //                 allocation: response.data[key].allocation,
        //             })



        //         }
        //         console.log(RAInfo);

        //         setra(RAInfo)
        //         //console.log(RAInfo)
        //     })
        //     .catch(error => { console.log(error) })

        // console.log("Getting users done");
    }, [])

    let datalist = [];

    if (enable && values.projectlist) {
        ra.forEach((e) => {
            // console.log("found");
            const data = [];
            data.push(e.id)
            data.push(e.employees_display_name)
            data.push(e.technology_name);
            data.push(e.project_name);
            data.push(e.roles_name);
            data.push(e.status);
            // data.push(e.percentage);
            data.push(e.allocation);
            data.push(e.utilization);
            data.push(e.emp_id)
            data.push(e.tech_id);
            data.push(e.proj_id);
            data.push(e.role_id);
            datalist.push(data);

        });
    }
    else {
        // console.log("not found");

        datalist = []
    }

    const handleClickOpen = (name) => {
        //console.log(datalist);

        setOpen(true);
    };
    function handleClose() {
        setOpen(false);
        setSow(false)
    }
    const handleClickOpenEdit = (id) => {
        //console.log(id);
        setEdit(true);
        //console.log((ra.filter(data => data.id == id)));
        setView((ra.filter(data => data.id == id)[0]))
        //     setOpen(true);
        //     //console.log(id)
        // //console.log(employee)
        //     setView(employee.filter(data=>data.id === id))

    };
    const editInput = (user, id) => {
        //console.log(user);
        let oldValue = values.projectlist;
        setrow([...row, user])
        showProjectWiseRecord(oldValue.id)
        // window.location.reload();
    }

    function handleCloseEdit() {

        setEdit(false);
    }
    const addInput = user => {
        // du.id = du.length + 1
        // setdu([...du, user]);
        // window.location.reload();
       // console.log(user);
       
        let oldValue = values.projectlist;
       // console.log(oldValue);

      //  console.log(user);
        setempidlist([...empidlist,user.emp_id])
        setrow([...row, user])
        empidlist.push({emp_id:user.emp_id});
       // console.log(empidlist);

       // setOpen(false);
        //window.location.reload();
        //setValues(oldValue)
        showProjectWiseRecord(oldValue.id)
        console.log(empidlist);
       
        
    }
    const options = {
        selectableRows: false,   //checkbox
        filterType: "dropdown",  //filter on columns
        responsive: "scroll",    //scrollbar
        // download:false,
        // print:false,
        // filter:false,
        // viewColumns:false

        //onRowClick: employee =>handleClickOpen(employee[0]), 
    };

    const handleClickDelete = (id) => {
        console.log(id);
        swal({
            title: "Done!",
            text: "Data Deleted successfully",
            icon: "success",
            timer: 1000,
            button: false
        })
        let oldValue = values.projectlist;

        instance.delete(`/Resource_Allocation/${id}`)
            .then(res => {
                console.log(res);
                setrow((ra.filter(data => data.id == id)))
                showProjectWiseRecord(oldValue.id)
            })
            .catch(error => { console.log(error) })


        //window.location.reload();
    }
    let Existing_Emp_ID=[];
    const showProjectWiseRecord = (id) => {
        // console.log("showProjectWiseRecord");
        setenable(true)
        //console.log(id);
        instance.get(`/Resource_Allocation/proj/${values.projectlist.id}`)
            .then(response => {
                //  console.log(response)
                for (const key in response.data) {
                    RAInfo.push({
                        id: response.data[key].id,
                        emp_id: response.data[key].emp_id,
                        tech_id: response.data[key].tech_id,
                        proj_id: response.data[key].proj_id,
                        role_id: response.data[key].role_id,
                        employees_display_name: response.data[key].employees[0].display_name,
                        technology_name: response.data[key].technology[0].name,
                        project_name: response.data[key].project[0].name,
                        roles_name: response.data[key].roles[0].role_title,
                        status: response.data[key].status,
                        percentage: response.data[key].percentage,
                        utilization: response.data[key].utilization,
                        allocation: response.data[key].allocation,
                    })
                    Existing_Emp_ID.push({
                        emp_id: response.data[key].emp_id,
                    })

                }
                setra(RAInfo)
                setempidlist(Existing_Emp_ID);
                // console.log(Existing_Emp_ID)
            })
            .catch(error => { console.log(error) })


    }

    // console.log(values);

    //SOW


    const [sow, setSow] = useState(false);

    const [file, setFile] = useState([])


    let sowlist = [];

    if (enable && values.projectlist) {
        file.forEach((e) => {
            // console.log("found");
            const data = [];

            data.push(e.id)
            data.push(values.projectlist.id)
            data.push(e.file_name)
            data.push(e.documents)
            sowlist.push(data);

        });
    }
    else {
        // console.log("not found");

        sowlist = []
    }
 
 

    let SowInfo = [];
    
    const showProjectWiseSow = (id) => {
        // console.log("showProjectWiseSow");
        setenable(true)
        // console.log(id);
        instance.get(`/Resource_Allocation/projectsow/${values.projectlist.id}`)
            .then(response => {
                // console.log(response)
                for (const key in response.data) {
                    SowInfo.push({
                        id: response.data[key].id,
                     //  project_id: response.data[key].project_id,
                        file_name: response.data[key].file_name,
                        //documents:response.data[key].documents
                    })
                   

                }
                setFile(SowInfo)
                // console.log(SowInfo)
            })
            .catch(error => { console.log(error) })


    }
    const addSow = user => {
        // file.id = file.length + 1
        // setdu([...du, user]);
        // window.location.reload();
        
        
        let oldValue = values.projectlist;
        // console.log(oldValue);

        console.log("Sow user");
        setFile([...file, user])
        //window.location.reload();
        //setValues(oldValue)
        showProjectWiseSow(oldValue.id)
    }
    const handleClickOpenSow = (id) => {
        setSow(true);
    };




    const multiFunction = (id) => {
        showProjectWiseSow(id);
        showProjectWiseRecord(id)
    }

    

    return (

        <div className="mainContent" >

            <div  width="auto"  >
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
                            <b>{option.id}</b>&emsp;{option.name}
                        </React.Fragment>
                    )}
                    style={{ width: 300,marginLeft:"30%"}}
                    renderInput={params => <TextField {...params} label="Project Name list" variant="outlined" />}
                />
                <br></br>
                <Button variant="contained" color="primary"
                 onClick={() => multiFunction(values.projectlist.id)} 
                 disabled={!values.projectlist || !values.projectlist.id}
                 style={{marginLeft:"40%"}}
                 >
                    OK
                </Button>
                <h4 style={{marginLeft:"30%"}}>Project selected:{values.projectlist ? values.projectlist.name : "Please Select Project"}</h4>
            </div>

            <Paper elevation={0} >

                <table width="100%">
                    <tr>
                        <td colspan="2">

                            <Paper elevation={12} style={{ maxHeight: 380, width: "100%" }}>
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start" >
                                    <b><p>Resourse Allocation for Project : {values.projectlist ? values.projectlist.name : ""}</p></b>
                                    <span style={{ margin: "10px 3px 0 auto" }}>
                                        <Button variant="contained" color="primary" disabled={!enable || !values.projectlist} onClick={handleClickOpen}  >
                                            <AddIcon />
                                        </Button>
                                    </span>

                                </Grid>
                                <Paper elevation={0} style={{ height: 330, overflow: "overlay", width: "95%"}}>
                                    <MUIDataTable

                                        data={datalist}
                                        columns={columns}
                                        options={options}
                                    // className={classes.root}
                                    />
                                </Paper>

                            </Paper>
                        </td>
                    </tr>

                    {/* 2nd row                         */}

                    <tr>



                        <td>

                            <Paper elevation={12} style={{ height: 380, width: "120%", overflow: "auto", marginTop: 20 }}>
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start">
                                    <h3>SOW's</h3>
                                    <span style={{ margin: "10px 3px 0 auto" }}>
                                        {/* <Dialog
                                            open={sow}
                                            onClose={handleClose}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Add SOW to Project</DialogTitle>
                                            <form >
                                                <DialogContent>
                                                    <p>Please Select File </p>
                                                    <br></br><br></br>
                                                    <input 
                                                        className={classes.input}
                                                        id="contained-button-file"
                                                        onChange={handleChange("documents")}
                                                        type="file"
                                                    />
                                                    <br></br><br></br>
                                                    <div>
                                                        <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
                                                            Upload
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </form>

                                        </Dialog> */}

                                        <Button variant="contained" color="primary" component="span" disabled={!enable || !values.projectlist} onClick={handleClickOpenSow}>
                                            <AddIcon />
                                        </Button>

                                    </span>

                                </Grid>
                                <Paper style={{ height: "auto", width: "auto", overflow: "auto" }}>
                                    <MUIDataTable style={{ height: "auto", width: "50%", overflow: "auto" }}

                                        data={sowlist}
                                        columns={columnsSow}
                                        options={options}
                                        className={classes.root}
                                    />
                                </Paper>
                            </Paper>

                        </td>



                        <td>
                            <Paper elevation={12} style={{ height: 380, width: "85%", overflow: "auto", marginLeft: "15%", marginTop: 20 }} >
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start" >
                                    <h3>MSAs</h3>
                                    <span style={{ margin: "10px 3px 0 auto" }}> <Button variant="contained" color="primary" > <AddIcon /> </Button></span>

                                </Grid>
                                <List >
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Brunch this weekend?"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Ali Connors
                                                </Typography>
                                                    {" — I'll be in your neighborhood doing errands this…"}
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemText><IconButton>
                                            <EditIcon color="primary" />
                                        </IconButton></ListItemText>
                                    </ListItem>

                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Summer BBQ"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        to Scott, Alex, Jennifer
                                                     </Typography>
                                                    {" — Wish I could come, but I'm out of town this…"}
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemText><IconButton>
                                            <EditIcon color="primary" />
                                        </IconButton></ListItemText>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Oui Oui"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Sandra Adams
                                                     </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </React.Fragment>
                                            }
                                        />
                                        <ListItemText><IconButton>
                                            <EditIcon color="primary" />
                                        </IconButton></ListItemText>
                                    </ListItem>
                                </List>
                            </Paper >
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <Paper elevation={12} style={{ maxHeight: 380, width: "100%", marginTop: 20, marginBottom: 50 }} >
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start" >
                                    <h3>Opportunities</h3>
                                    <span style={{ margin: "10px 3px 0 auto" }}> <Button variant="contained" color="primary" > <AddIcon /> </Button></span>

                                </Grid>
                                <List>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Brunch this weekend?"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Ali Connors
                                                </Typography>
                                                    {" — I'll be in your neighborhood doing errands this…"}
                                                </React.Fragment>
                                            }
                                        />

                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Summer BBQ"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        to Scott, Alex, Jennifer
                                                     </Typography>
                                                    {" — Wish I could come, but I'm out of town this…"}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Oui Oui"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Sandra Adams
                                                     </Typography>
                                                    {' — Do you have Paris recommendations? Have you ever…'}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Paper >
                        </td>
                    </tr>


                </table>
            </Paper>
            <AddSow sow={sow} handleClose={handleClose} proj_id={values.projectlist} addSow={addSow}/>
            <AddEmpToProject open={open} handleClose={handleClose} proj_id={values.projectlist} addInput={addInput} empidlist={empidlist}/>
            <EditProjectDashboard edit={edit} handleClose={handleCloseEdit} view={view} editInput={editInput} proj_id={values.projectlist} />
        </div>


    );

}
export default ProjectDashboard;