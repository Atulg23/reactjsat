import React, { Fragment, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DropDown from '../../common/DropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import instance from './../../common/instance';

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

const status = [
    {
      value: "true",
      label: "true"
    },
    {
      value: "false",
      label: "false"
    }
]

const EditDUDD = (props) => {

    const classes = useStyles(0);
    const initialInputs = { du_id: props.view.du_id, employee_id:props.view.employee_id, is_active: true, start_date: props.view.start_date, end_date: props.view.end_date, duname: props.view.duname }
    const [values, setValues] = React.useState(initialInputs)
  

  
    //for empid    
    const [empid, setempid] = useState([]);
    //for DUID
    const [duid, setduid] = useState([]);
    let duddDataEmployeeID = [];        //for employee id, name
    let duddDataDUID = [];              //for DU id, name
    useEffect(() => {
        console.log("Getting users");

      
    //For Employee         
        instance.get('/employees/')
            .then(response => {
                console.log(response)
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

       console.log("Getting users done");
    }, [])


    const handleChange = (name) => (event) => {

        setValues({ ...values, [name]: event.target.value });
      

    };


    const handleSubmit = (e) => {
    
        e.preventDefault();
           let updatedEmpId,updatedDUId;
           let updatedfrom_date,updatedend_date;
           
        //    console.log(props);
        //    console.log(props.view);
           
        //    console.log(values);
           
            if(values.emplist )
                updatedEmpId=values.emplist.id
            else
                updatedEmpId=props.view.employee_id
           
            if(values.ddlist )
                updatedDUId=values.ddlist.id
            else
                updatedDUId=props.view.du_id

            if(values.start_date)
                updatedfrom_date=values.start_date;
            else
                updatedfrom_date=props.view.start_date;
           
            if(values.end_date)
                updatedend_date=values.end_date;
            else
                updatedend_date=props.view.end_date;
           


        
                let data={
                    du_id:updatedDUId,
                    employee_id:parseInt(updatedEmpId),
                    start_date: updatedfrom_date,
                    end_date: updatedend_date,
                    is_active:values.is_active
                 }
           
                console.log(data)
                instance.put(`/Delivery_unit_director/${props.view.id}`,data)
                .then(res => {
                console.log(res);
                    props.editInput(data,props.view.id)
                
                 })
                 .catch(error=>{console.log(error)})
  
    }
   

    return (
        <Fragment>
        <Dialog
            open={props.edit}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Organization</DialogTitle>
            <form onSubmit={handleSubmit}>

                <DialogContent>
                    
                    <br/>
                    {props.view.du_id}
                    <Autocomplete
                        id="DD Name list"
                        options={duid}
                        getOptionLabel={option => option.name}
                        onChange={(event, ddlist) => {
                            setValues({ ...values, ddlist });
                        }}
                        renderOption={option => (
                            <React.Fragment>
                                <b>{option.id}</b>&emsp;{option.name}
                            </React.Fragment>
                        )}
                        style={{ width: 300 }}
                        renderInput={params => <TextField {...params} label="DD Name list" variant="outlined" />}
                    />
                    <br/>
                    {props.view.employee_id}
                    <Autocomplete
                        id="employee list"
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
                        renderInput={params => <TextField {...params} label="employee list" variant="outlined" />}
                    />
                    <TextField
                     
                        id="outlined-name"
                        label="from Date"
                        defaultValue=""
                        type="date"
                        className={classes.textField}
                        value={values.start_date}
                        onChange={handleChange("start_date")}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        id="outlined-name"
                        label="end Date"
                        defaultValue=""
                        placeholder="END date"
                        type="date"
                        className={classes.textField}
                        value={values.end_date}
                        onChange={handleChange("end_date")}
                        margin="normal"
                        variant="outlined"
                    />

                    <DropDown
                            id="is_active"
                            label="Status"
                            defaultValue={props.view.is_active}
                            values={values.is_active}
                            handleChange={handleChange}
                            data={status}
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

export default EditDUDD;
