import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
import  DatePicker from "../../common/DatePicker";
import { DateTimePicker } from "@material-ui/pickers";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: "100%",
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

const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        root: {
          backgroundColor: "#FFF",
           //display: "table-cell",
         fontWeight:"bold",
        
         
        }
      },
      MuiTableCell: {
        root: {
          marginLeft: "50px",
          //backgroundColor: "#FFF",
          display: "table-cell",
          padding: "8px"
        }
      },
     
    //   MuiTableSortLabel: {
    //     active: {
    //       //marginLeft:"3px",
    //       marginTop: "10px",
  
    //       // backgroundColor: 'green' // your color here
    //     },
    //     MuiIconButton: {
    //       padding: "10px"
    //     }
    //   },
  
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
  

let datalist=[];
const PeopleList = (props) => {

    const classes = useStyles(0);
    console.log(props.list);
    
    const columns = [

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
            label: "Project Start Date ",
            name: "project_start_date",
            options: {
                sort: false
            }

        },
        {
            label: "Project End Date ",
            name: "project_end_date",
            options: {
                sort: false
            }

        },
        {
            label: "Allocation Start Date ",
            name: "allocation_start_date",
            options: {
                sort: false
            }

        },
        {
            label: "Allocation End Date ",
            name: "allocation_end_date",
            options: {
                sort: false
            }

        },
        {
            label: "Billability",
            name: "billability",
            options: {
                sort: false
            }
        },
        {
            label: "Allocation %",
            name: "allocation",
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

    

    return (
        <Fragment>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="650px"
                >
                <DialogTitle id="form-dialog-title" style={{marginLeft:"280px"}}><b>Currently Allocated Resource Details</b></DialogTitle>
                    <DialogContent>
                    <MuiThemeProvider theme={getMuiTheme()}>

                        <MUIDataTable
                        data={datalist}
                        columns={columns}
                        options={options}

                        />
                    </MuiThemeProvider> 
                                            
                     
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" onClick={props.handleClose}>Ok</Button>
                    </DialogActions>
             
            </Dialog>
        </Fragment>
    );
};

export default PeopleList;
