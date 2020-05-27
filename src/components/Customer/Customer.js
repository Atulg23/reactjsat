import React, { useState, useEffect, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";
import instance from '../../common/instance';
import AddCustomer from "./AddCustomer";
import Slide from '@material-ui/core/Slide';
import EditCustomer from './EditCustomer';
import swal from 'sweetalert';
import AddIcon from '@material-ui/icons/Add'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CircularProgress from '@material-ui/core/CircularProgress';


const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          backgroundColor: "#FFF",
          //  display: table-cell,
          padding: "4px"
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
      // MuiDataTableHeadCell: {
      //   root: {
      //     backgroundColor: "red",
      //   //  display: table-cell,
      //     // padding:"7px"
      //   }
      // }
    }
  })
  
const domain = [
    {
        value: "Domain1",
        label: "true"
    },
    {
        value: "false",
        label: "false"
    }
]

const dummyData = [
    {
      "id": 1,
      "status": true,
      "country_name":"ID1",
      "customer_name":"Customer1",
      "short_name":"Cust1",
      // "code":"1",
      "customer_type":"Type1",
      "domain":"D1",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 2,
      "status": true,
      "country_name":"ID2",
      "customer_name":"Customer2",
      "short_name":"Cust2",
      // "code":"2",
      "customer_type":"Type1",
      "domain":"D2",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 3,
      "status": true,
      "country_name":"ID3",
      "customer_name":"Customer3",
      "short_name":"Cust3",
      // "code":"3",
      "customer_type":"Type2",
      "domain":"D3",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 4,
      "status": true,
      "country_name":"ID4",
      "customer_name":"Customer4",
      "short_name":"Cust4",
      // "code":"4",
      "customer_type":"Type1",
      "domain":"D2",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 5,
      "status": true,
      "country_name":"ID5",
      "customer_name":"Customer5",
      "short_name":"Cust5",
      // "code":"5",
      "customer_type":"Type3",
      "domain":"D1",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 6,
      "status": false,
      "country_name":"ID6",
      "customer_name":"Customer6",
      "short_name":"Cust6",
      // "code":"6",
      "customer_type":"Type2",
      "domain":"D2",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    },
    {
      "id": 7,
      "status": false,
      "country_name":"ID7",
      "customer_name":"Customer7",
      "short_name":"Cust7",
      // "code":"7",
      "customer_type":"Type1",
      "domain":"D3",
      "onboarding_date":"",
      // "start_date":"",
      // "end_date":"",
      "website":"",
    }

]
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
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
const Customer = (props) => {
  const classes = useStyles();

    const columns = [
        { label: "Id", name: "id", options: { display: false,sortDirection:'desc' } },
        // {
        //     label: "",
        //     name: "",
        //     options: {
        //       // sortDirection:'desc',
      
        //       customBodyRender: (value, tableMeta, updateValue) => {
        //         const rowId = tableMeta.rowData;
        //         // console.log(value);
      
      
             
        //           return (
        //             <FiberManualRecordIcon fontSize="small" style={{ color: "green" }}></FiberManualRecordIcon>
        //             // <h2>hi</h2>
        //           );
                
        //       }
        //     }
      
      
        // },
        { label: "Country", name: "country_name" },
        { label: "Customer Name", name: "customer_name" },
        { label: "Short Name", name: "short_name" },
        // { label: "Code", name: "code" ,options:{display:false}},
        { label: "Customer Type", name: "customer_type" },
        { label: "Domains", name: "domains" },
        // { label: "Start Date", name: "start_date" },
        // { label: "End Date", name: "end_date" },
        { label: "Onboarding Date", name: "onboarding_date" },
        { label: "Website", name: "website" },
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
                    
                    if (rowId[1]) {
                        return (
                          <div>
                            <IconButton id="edit"
                            // onClick={() => props.history.push('/editcustomer')}
                            onClick={() => props.history.push({
                              pathname: '/editcustomer',
                              state: { cno: rowId[0] ,cname:rowId[1],companyname:rowId[2],shortname:rowId[3],date:rowId[6],websitelist:rowId[7]}})} 
                            >
                              <EditIcon />
                            </IconButton>
                            {/* <IconButton onClick={() => handleClickOpen()}>
                              <EditIcon />
                            </IconButton> */}
                            
                            {/* <IconButton onClick={() => handleClickOpen()}>
                            <VisibilityIcon  />
                            </IconButton> */}
                          </div>
                        )
                      }
                      else {
                        return (
                          <IconButton id="edit" onClick={() => handleClickOpen(rowId[2],rowId[3],rowId[6])}>
                           <VisibilityIcon />
                          </IconButton>
                        )
                      }
                    // return (

                    //     <div>
                    //         <IconButton onClick={() => handleClickOpen(rowId[0])}>
                    //             <VisibilityIcon color="primary" />
                    //         </IconButton>
                    //         <IconButton onClick={() => handleClickOpenEdit(rowId[0])}>
                    //             <EditIcon style={{ color: 'green' }} />
                    //         </IconButton>
                            
                    //     </div>
                    // )
                }
            },
        }
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
        filterType: "dropdown",
        responsive: "scroll",
        // download: false,
        print: false,
        selectableRows: false,
        viewColumns: false,
        textLabels: {
          body: {
            
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
           onDownload(){
            console.log("download");
            
        }


    };

    const [customer, setCustomer] = useState([]);
    //const[details,setDetails] = useState([false])
    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
   
    const [view, setView] = useState([])
    const [viewEdit, setViewEdit] = useState([])



    let customerData = [];
    useEffect(() => {
        console.log("Getting users");
        instance.get('/customers/')
            .then(response => {
                console.log(response)

                for (const key in response.data) {
                  let dl=[];
                  for (let i = 0; i < response.data[key].domain_id.length; i++) {
                    dl.push({
                      domains:response.data[key].domain_id[i]
                    })
                    
                  }
                    customerData.push({
                        id: response.data[key].customer_id,
                        name: response.data[key].company_name,
                        short_name: response.data[key].short_name,
                        // code: response.data[key].code,
                        // domains:[...response.data[key].domains],
                        
                        country_name: response.data[key].country[0].country_name,
                        domains: dl,
                        from_date: response.data[key].onboarding_date,
                        // end_date: response.data[key].end_date,
                        website: response.data[key].website[0],
                        customer_type: response.data[key].customer_type[0].customer_type_name
                    })
                  


                }
                setCustomer(customerData)

            })
        // console.log(customer)

    }, [])
    console.log(customer)
  

    const handleClickOpen = (id) => {
        setOpen(true);
        // setView(customer.filter(data => data.id === id))
        setView(dummyData.filter(data => data.id === id))

    };
    const handleClose = () => {
        setOpen(false);
        setAdd(false);
        setEdit(false);
   
    };
    const handleClickOpenAdd = (id) => {
        setAdd(true);
    };
   
    const handleClickOpenEdit = (id) => {

        // console.log(id);
        // console.log((customer.filter(data => data.id === id)));
        setViewEdit((customer.filter(data => data.id === id)[0]));
        // console.log(view);
        setEdit(true);

    }

    const handleClickDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, You will not be able to recover Record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setCustomer(customer.filter(data => data.id !== id))
                    instance.delete(`/customers/${id}`)
                        .then(res => {
                            console.log(res);
                        }).catch(error => {
                            console.log(error)
                        })
                    swal("Poof! The Record file has been deleted!", {
                        icon: "success",
                        buttons: false,
                        timer: 1000,
                    });
                } else {
                    swal("The Record is safe!");
                }
            });
    }

    const addInput = user => {
        customer.id = customer.length + 1;

        setCustomer([...customer, user])
        // window.location.reload();
        // console.log(user);
    }
    const dummyData1 = [
      {
      "id":1,
      "country_name": "India",
      "customer_name": "Company1",
      "short_name": "comp1",
      "customer_type": "Type3",
      "domain": "Type3",
      "onboarding_date": "10-11-2020",
      "website": "www.company1.com",
  
      }
    ]
console.log(customer);

    let datalist = [];
    customer.forEach((c) => {
    // dummyData1.forEach((c) => {
        const data = [];
        
      //  console.log(c.domains);
      var domainoptions="",oldvalue="";
      for (let i = 0; i < c.domains.length; i++) {
        // console.log(c.domains[i].domains);
        if(c.domains.length==1)
        domainoptions=c.domains[i].domains

        else
        domainoptions= c.domains[i].domains?c.domains[i].domains+','+oldvalue:oldvalue
        oldvalue=domainoptions
              
      }
      console.log(domainoptions);
      
       
        data.push(c.id);
        // data.push("");
        data.push(c.country_name);
        data.push(c.name);
        data.push(c.short_name);
        data.push(c.customer_type);
        // data.push(c.domains);
        data.push(domainoptions)
        data.push(c.from_date.slice(0,10))
        // data.push(c.from_date);
        // // data.push(c.from_date);
        // // data.push(c.end_date);
        data.push(c.website);
        datalist.push(data);
        // console.log(datalist);
        
    });
    // console.log(datalist);
    const editInput = user => {
      
        window.location.reload();
        // console.log(user);
    }


    return (
        
        <div className="mainContent">
        <div >
            {/* <Button variant="contained" color="primary" onClick={handleClickOpenAdd}> */}
            {/* <Button variant="contained" color="primary" > */}
                {/* <AddIcon ></AddIcon> */}
          {/* </Button>  */}
          <Button id="addcust" className={classes.button} variant="contained" onClick={() => props.history.push('/addcustomer')} >
        Add Customer 
      </Button>
           <br></br><br></br>
           <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                        title={"Customers"}
                        data={datalist}
                        columns={columns}
                        options={options}
                    //  className={classes.root}
                    />

          </MuiThemeProvider>
            

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth>
                <DialogTitle id="alert-dialog-slide-title">{"Customer Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {view.map(v => (
                            <Grid>
                                {/* <Grid><h2><b>{v.name}</b></h2></Grid>
                                <Grid><h5>Short Name</h5>{v.short_name}</Grid>
                                <Grid><h5>Code</h5>{v.code}</Grid>
                                <Grid><h5>Country Code</h5>{v.country_id}</Grid>
                                <Grid><h5>Domain</h5>{v.domains}</Grid>
                                <Grid><h5>From Date</h5>{v.from_date}</Grid>
                                <Grid><h5>End Date</h5>{v.end_date}</Grid>
                                <Grid><h5>Websites</h5>{v.website}</Grid>
                                <Grid><h5>Customer Type</h5>{v.customer_type}</Grid> */}
                                <h2>hi</h2>

                            </Grid>

                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="close "onClick={handleClose} color="primary">
                        Ok
              </Button>
                </DialogActions>
            </Dialog>



            {/* <AddCustomer add={add} handleClose={handleClose} addInput={addInput} /> */}
            {/* <EditCustomer edit={edit} handleClose={handleClose} viewEdit={viewEdit} editInput={editInput} /> */}
          
            </div>
        </div>
        
        
        )


}
export default Customer;

