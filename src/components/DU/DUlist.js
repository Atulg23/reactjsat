import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import instance from '../../common/instance'
import Slide from '@material-ui/core/Slide';
import MUIDataTable from "mui-datatables";
import AddDU from "./AddDU";
import EditDU from "./EditDU";
import AddIcon from '@material-ui/icons/Add';

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from 'sweetalert';
import  DropDown from "../../common/DropDown";
import  DatePicker from "../../common/DatePicker";
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'


const useStyles = () =>
    makeStyles({
        root: {
            width: "500%",

        },
        container: {
            maxHeight: 440,
        },

    });

;

const Delivery_Units = () => {

    const classes = useStyles();
   
    const [du, setdu] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [empDetails, setEmpDetails] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
   
    const [view, setView] = React.useState([]);

    function handleClose() {
        setOpen(false);
      
    }
    function handleCloseEdit() {
        
        setEdit(false);
    }

    const columns = [

        {
            label: "Id",
            name: "id",
            options:{
                display:false
            }
        },
        {
            label: "DU Name",
            name: "name",

        },
        // {
        //     label: "Employee Name",
        //     name: "emp_name",

        // },
        // {
        //     label: "Description",
        //     name: "description",

        // },
        {
            label: "From Date",
            name: "from_date",

        },
        {
            label: "End Date",
            name: "end_date",

        },
        {
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
              
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowId = tableMeta.rowData;

                   
                    
                    return (
                       
                        <div>
                           
                            <IconButton onClick={()=>handleClickOpenEdit(rowId[0])}>
                                <EditIcon color="primary"  />
                            </IconButton>
                            <IconButton onClick={() => { handleClickDelete(rowId[0]) }}>
                                <DeleteIcon color="secondary"  />
                            </IconButton>
                            </div>
                    )
                }
            },
        }
    ];

    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        download: true,
        print: true,
        selectableRows:false
        
    };


    let duData = [];
    useEffect(() => {
        console.log("Getting users");
        
        // const instance = axios.create({
    
        //     baseURL: 'http://10.21.16.83:9200/api/'
        // });
       
        
        instance.get('/delivery_unit/')
            .then(response => {
                console.log(response)
                for (const key in response.data) {
                    duData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        from_date: response.data[key].from_date,
                        end_date: response.data[key].end_date,
                    })
                    // console.log(response.data[key].id);
                }
                 setdu(duData)
                // console.log(employeeData)
            })
            .catch(error=>{console.log(error)})

//TEST
//for multiple request
// let one = "http://10.21.16.32:5000/api/employees/"
// let two = "http://10.21.16.32:5000/api/delivery_units/"

// const requestOne = axios.get(one);
// const requestTwo = axios.get(two);
// axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
//     const responseOne = responses[0]
//     const responseTwo = responses[1]
//     console.log(responseOne);
//     console.log(responseTwo);
    
//     // use/access the results 
//   })).catch(errors => {
//     // react on errors.
//   })
//   console.log(responseOne);

            console.log("Getting users done");
    }, [])


    let datalist = [];
    du.forEach((e) => {
        const data = [];
        data.push(e.id);
        data.push(e.name);
        data.push(e.from_date);
        data.push(e.end_date);
        datalist.push(data);
        //  console.log(datalist);
    });

  
    
    const handleClickOpenEdit = (id) => {
       
          console.log(id);
          console.log((du.filter(data => data.id === id)));
          setView((du.filter(data => data.id === id)[0]));

          console.log(view);
         
        setEdit(true);
        
    }

    const handleClickDelete = (id) => {
        swal({
             title: "Done!",
             text: "Data Deleted successfully",
             icon: "success",
             timer: 1000,
             button: false
        })
        console.log(id);
        axios.delete(`http://10.21.16.83:9200/api/delivery_unit/${id}`)
        .then(res => {
            console.log(res);
        setdu(du.filter(data=>data.id !== id))
         })
         .catch(error=>{console.log(error)})
    }

    const handleClickOpen = (name) => {
        setOpen(true);
    };

    

    const addInput = user => {
        du.id = du.length + 1
        setdu([...du, user]);
       // window.location.reload();
        console.log(user);
    }
    const editInput = (user,id) => {
        console.log(user);
        // setTimeout({addInput},200);
        window.location.reload();
    }

    return (

        <Paper className="mainContent">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
               <AddIcon/>
          </Button>  <br></br>  <br></br>
            <MUIDataTable
                title={"Delivery Unit List"}
                data={datalist}
                columns={columns}
                options={options}
                className={classes.root}
            />
            
            <AddDU open={open} handleClose={handleClose} addInput={addInput} />
            <EditDU edit={edit} handleClose={handleCloseEdit} editInput={editInput}  view={view}/>

            

        </Paper>

    )
}

export default Delivery_Units;





//OLD DU 4 Fields

// import React,{Fragment,useState,useEffect} from 'react';
// import { DialogTitle, TextField, Box, makeStyles, Grid, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
// // import { DropDown, DatePicker } from '../Employee/AddEmployee/FormComponents';
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import  DropDown from "../../common/DropDown";
// import  DatePicker from "../../common/DatePicker";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import MUIDataTable from "mui-datatables";
// import instance from '../../common/instance'



// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//     { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
//   ];
// const department = [
//     {
//       value: "Rakesh Kamble",
//       label: "Rakesh Kamble",
//       status:"active"
//     },
//     {
//       value: "Shantanu Jadhav",
//       label: "Shantanu Jadhav",
//       status:"active"
//     },
//     {
//       value: "Yogesh Ghotekar",
//       label: "Yogesh Ghotekar",
//       status:"active"
//     },
//     {
//       value: "Amit Sutar",
//       label: "Amit Sutar",
//       status:"inactive"
//     },

//   ];
//   function createData(
//     bu,
//     empId,
//     empName,
//     ddname,
//     Start_date,
//     End_date,
//     Du_start_date
//   ) {
//     return { bu, empId, empName,ddname,Start_date,End_date,Du_start_date };
//   }
//   const rows = [
//     createData(
//       "Unit 1",
//       "NIPL062",
//       "Rakesh Kamble",
//       "Amit Sutar",
//       "01-02-2014",
//       "01-02-2014",
//       "01-02-2014"
//     ),
//     createData(
//       "Unit 2",
//       "NIPL579",
//       "Shantanu Jadhav",
//       "Rakesh Kamble",
//       "01-02-2014",
//       "01-02-2014",
//       "01-02-2014"
//     ),
//     createData(
//       "Unit 1",
//       "NIPL501",
//       "Yogesh Ghotekar",
//       "Rakesh Kamble",
//       "01-02-2014",
//       "01-02-2014",
//       "01-02-2014"
//     )
//   ];


// const DU = () => {

//     const [employee,setEmployees]=useState([]);

//     const columns = ["Id","Name", "Email_Id", "DOB"];

//     const options = {
//       filterType: "dropdown",
//       responsive: "scroll",
//       download:true,
//       print:true,
//       onRowClick: employee =>handleClickOpen(employee[0]),
  
      
//     };
  
  
//     let employeeData=[]; 
//     useEffect(()=>{
//         console.log("Getting users");
//         instance.get('/employees/')
//         .then(response => {
//           //console.log(response.data.employees)
//           for(const key in response.data.employees){
//             employeeData.push({
//               id: response.data.employees[key].id,
//               display_name: response.data.employees[key].display_name,
//               email_id:response.data.employees[key].email_id ,
//               gender: response.data.employees[key].gender,
//               dob: response.data.employees[key].dob,
//               is_active: response.data.employees[key].is_active,
//               created_on:response.data.employees[key].created_on,
//               joining_date:response.data.employees[key].joining_date ,
//               updated_on:response.data.employees[key].updated_on ,
//               last_working_day:response.data.employees[key].last_working_day,
//               deleted_on: response.data.employees[key].deleted_on,
//               first_name: response.data.employees[key].first_name,
//               resigned:response.data.employees[key].resigned ,
//               photo_path: response.data.employees[key].photo_path,
//               last_name:response.data.employees[key].last_name ,
//               employee_id:response.data.employees[key].employee_id ,
//               middle_name: response.data.employees[key].middle_name,
//               on_boarded_by:response.data.employees[key].on_boarded_by ,
//               on_boarded_on: response.data.employees[key].on_boarded_on
//             })
//            // console.log(response.data[key].id);
//           }
//           setEmployees(employeeData)
//           //console.log(employeeData)
//         })
      
//     },[])
  
//     const [values, setValues] = useState({
//       id: "",
//       display_name:"",
//       email_id: "",
//       gender: "",
//       dob: "",
//       is_active:"",
//       created_on:"",
//       joining_date: "",
//       updated_on: "",
//       last_working_day:"",
//       deleted_on:"" ,
//       first_name:"" ,
//       resigned: "",
//       photo_path:"" ,
//       last_name: "",
//       employee_id:"" ,
//       middle_name: "",
//       on_boarded_by:"" ,
//       on_boarded_on: ""
//     });

//     const [open, setOpen] = React.useState(false);

// function handleClickOpen() {
//   setOpen(true);
// }

// function handleClose() {
//   setOpen(false);
// }
// let datalist=[];
// employee.forEach((e) => {
//       const data = [];
//       data.push(e.id);
//       data.push(e.display_name);
//       data.push(e.email_id);
//       data.push(e.dob);
//       datalist.push(data);
//       //console.log(datalist);
// });
//     return(
//         <Fragment>
//             <div className="mainContent">
//             <Button variant="contained" color="primary" >
//             Add DU
//             </Button>
            
//                 <table>
//                     <tr>
//                     <td>
//                     <Autocomplete
//                             id="employee list"
//                             options={employee}
//                             getOptionLabel={option => option.email_id}
//                             style={{ width: 300 }}
//                             renderInput={params => <TextField {...params} label="employee list" variant="outlined" />}
//                         />
//                     </td>
//                     <td>
//                     <Autocomplete
//                             id="DD list"
//                             options={top100Films}
//                             getOptionLabel={option => option.title}
//                             style={{ width: 300 }}
//                             renderInput={params => <TextField {...params} label="DD list" variant="outlined" />}
//                         />
//                     </td>
//                     <td>
//                         <DatePicker id="doj" label="Start Date" />
//                     </td>
//                     <td>
//                         <DatePicker id="dor" label="End Date" />
//                     </td>
//                     <td>
//                         <DatePicker id="dorelease" label="DU Start Date" />
//                     </td>
                    
//                     </tr>
//                 </table>
//                 <MUIDataTable
//               title={"Employee List"}
//               data={datalist}
//               columns={columns}
//               options={options}
//          />
//             </div>
        
//         </Fragment>
//     )

    
// }

// export default DU;