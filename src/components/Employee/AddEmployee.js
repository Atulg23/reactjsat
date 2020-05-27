import React ,{ Fragment,useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import  DropDown from "../../common/DropDown";
import  DatePicker from "../../common/DatePicker";
const role = [
    {
      value: "Buisness Analyst",
      label: "Buisness Analyst"
    },
    {
      value: "Developer",
      label: "Developer"
    },
    {
      value: "Tester",
      label: "Tester"
    },
    {
      value: "Data Scientist",
      label: "Data Scientist"
    }
  ];
const AddEmployee = ({open,handleClose}) => {
    
    const [opendialog, setOpendialog] = useState(false);

    const [values, setValues] = React.useState({
        name: "Employee name",
        age: "",
        multiline: "Controlled",
        role: "Software Associate",
        bunit: "Unit 1",
        pSkill: "Buisness Analysis",
        department: "Project and Delivery"
      });
    
      const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
      };

   
    return (
        <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter Employee details</DialogContentText>
            <TextField
              id="outlined-read-only-input"
              label="Employee Id"
              defaultValue=""
            
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Name"
              defaultValue=""
             
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              variant="outlined"
            />
   
             <TextField
              id="outlined-read-only-input"
              label="Years of Experience"
              defaultValue=""
             
              margin="normal"
              InputProps={{
                readOnly: false
              }}
              variant="outlined"
            />
            {/* <TextField
              id="outlined-select-unit"
              select
              label="Buisness Unit"
             
              value={values.bunit}
              onChange={handleChange("unit")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {unit.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> } */}
              <DropDown
              id="role"
              label="Employee Role"
              values={values.role}
              handleChange={handleChange}
              data={role}
            />
            {/*<DropDown
              id="primary skills"
              label="Primary Skills"
              values={values.pSkill}
              handleChange={handleChange}
              data={primarySkill}
            />
            <DropDown
              id="secondary skills"
              label="Secondary Skills"
              values={values.pSkill}
              handleChange={handleChange}
              data={primarySkill}
            />
            <DropDown
              id="department"
              label="Department"
              values={values.department}
              handleChange={handleChange}
              data={department}
            /> 
  
             <DatePicker id="doj" label="Date of Joining" />
            <DatePicker id="dor" label="Date of Resignation" />
            <DatePicker id="dorelease" label="Date of Release" />  */}
             <DatePicker id="doj" label="Date of Joining" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
}

export default AddEmployee;