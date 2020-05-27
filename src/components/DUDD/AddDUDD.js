import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
//import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';



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



const AddDUDD = (props) => {

    const classes = useStyles(0);
    const initialInputs = { du_id: " ", employee_id: "", is_active: true, start_date: "", end_date: "", duname: "" }
    const [values, setValues] = React.useState(initialInputs)
   


    //for multiple api calls 

    //for empid    
    const [empid, setempid] = useState([]);
    //for DUID
    const [duid, setduid] = useState([]);

    let duddDataEmployeeID = [];        //for employee id, name
    let duddDataDUID = [];              //for DU id, name
//    let duddData = [];                    //for start_date, end_date

    useEffect(() => {
        console.log("Getting users");
    //For Employee         
        instance.get('/employees/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    duddDataEmployeeID.push({
                        id: response.data[key].id,
                        display_name: response.data[key].display_name,
                    })
                   
                }
                 setempid(duddDataEmployeeID)
                // console.log(employeeData)
            })
            .catch(error=>{console.log(error)})

    //For Delivery Unit       
            instance.get('/delivery_unit/')
            .then(response => {
                //console.log(response)
                for (const key in response.data) {
                    duddDataDUID.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                    })
                }
                 setduid(duddDataDUID)
                // console.log(employeeData)
            })
            .catch(error=>{console.log(error)})

      // console.log("Getting users done");
    }, [])


    const handleChange = (name) => (event) => {
        // console.log(name);
        // console.log(event);

        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        //console.log(values);
        var sd = new Date(values.start_date);
        var start_date = sd.toISOString();

        var ed = new Date(values.end_date);

        var end_date = ed.toISOString();


        let data = {
            du_id: values.ddlist.id,
            employee_id: values.emplist.id,
            start_date: start_date,
            end_date: end_date,
            "is_active": true,
        }
        console.log(data);



        instance.post('/Delivery_unit_director/', data)
            .then((response) => {
                console.log(response);
                //swal("Good job!", "Record inserted successfully!", "success");
                props.addInput(data)
            }, (error) => {
                console.log(error);
            });

        
         setValues(initialInputs);
         
    }
 
    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Delivery_Unit Director</DialogTitle>
                <form onSubmit={handleSubmit}>

                    <DialogContent>

                       

                        <Autocomplete
                            id="DD Name list"
                            options={duid}
                            getOptionLabel={option => option.name}
                            onChange={(event, ddlist) => {
                                setValues({ ...values, ddlist});
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    <b>{option.id}</b>&emsp;{option.name}
                                </React.Fragment>
                            )}
                            style={{ width: 300 }}
                            renderInput={params => <TextField {...params} label="Select Delivery Unit" variant="outlined" />}
                        />
                        <br/>
                        <Autocomplete
                            id="Employee List"
                            options={empid}
                            getOptionLabel={option => option.display_name}
                            onChange={(event, emplist) => {
                                setValues({ ...values, emplist });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    <b>{option.id}</b>&emsp;{option.display_name}
                                </React.Fragment>
                            )}
                            style={{ width: 300 }}
                            renderInput={params => <TextField {...params} label="Select Employee" variant="outlined" />}
                        />
                        <br/>
                        from Date:
                        <TextField
                            id="outlined-name"
                            label=""
                            defaultValue=""
                            type="date"
                            className={classes.textField}
                            value={values.start_date}
                            onChange={handleChange("start_date")}
                            margin="normal"
                            variant="outlined"
                        />
                        end Date:
                        <TextField
                            id="outlined-name"
                            label=""
                            defaultValue=""
                           
                            type="date"
                            className={classes.textField}
                            value={values.end_date}
                            onChange={handleChange("end_date")}
                            margin="normal"
                            variant="outlined"
                        />



                    </DialogContent>


                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={props.handleClose}>save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default AddDUDD;
