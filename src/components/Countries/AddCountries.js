import React, { Fragment,useState} from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance'





const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      width: "100%",
    },
    dialogcontent: {
        width: "100%"
      },
      dropdown: {
        width: "100%"
      },
    dense: {
    },
    menu: {
      width: 200
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



    const AddCountries = (props) => {

    const classes = useStyles(0);
    const initialInputs = { id:"", name:""}
    const [countries,setCountries]=useState([]);

  
    const handleChange = (name) => (event) => {
        setCountries({ ...countries, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
      
      console.log(countries);
        event.preventDefault();
        let obj={
            id:countries.id,
            name:countries.name
        }
        console.log(obj); 
        instance.post('/countries/',obj)
        .then(response=>{
            props.addCountries(obj);
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        setCountries(initialInputs);
    }


    return (
      <Fragment>       
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Countries</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
          <TextField
            id="outlined-name"
            label="Country Name"
            defaultValue=""
            className={classes.textField}
            value={countries.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          /> 
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" >Cancle</Button>
            <Button onClick={props.handleClose} color="primary" type="submit">Add</Button>
          </DialogActions>       
      </form>
        </Dialog>
       
      </Fragment>
    );
  };
  
  export default AddCountries;
  