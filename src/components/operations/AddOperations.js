import React, { Fragment,useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance'
import Paper from '@material-ui/core/Paper'
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



    const AddOperations = (props) => {

       const [section, setSection] = useState([]);
      // const [sectionIDs, setsectionIDs] = useState([]);

       let sections=[]; 
      useEffect(()=>{
          console.log("Getting sections");
          instance.get('/Sections/')
          .then(response => {
            for(const key in response.data){
              sections.push({
                id: response.data[key].id,
                section_title: response.data[key].section_title,
              })
            }
            setSection(sections);
          })
          console.log("sectionArray:" ,section);      
      },[])
    

    const classes = useStyles(0);
    const initialInputs = { operation_title:"", is_active:true,operation_description: "",section_id:""}
    const [operations,setOperations]=useState(initialInputs);

  
    const handleChange = (name) => (event) => {
        setOperations({ ...operations, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
      
      console.log(operations);
        event.preventDefault();
        let data={
            operation_title:operations.operation_title,
            is_active:true,
            operation_description:operations.operation_description,
            section_id:operations.sectionData.id 
        }
        
        console.log(data);
        
        instance.post('/operation/',data)
        .then(response=>{
          props.AddOperation(data);
           // console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        setOperations(initialInputs);
        
    }


    return (
      <Fragment>
       <Paper>
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Operation</DialogTitle>
      <form onSubmit={handleSubmit}>
      <DialogContent>
            <Autocomplete
                  id="section list"
                  options={section}
                  getOptionLabel={option=>option.section_title}
                  onChange={(event,sectionData)=>
                    {
                      setOperations({...operations,sectionData});
                    } }
                  renderOption={option=> (
                  <React.Fragment>
                  <b>{option.id}</b>&emsp;{option.section_title}
                  </React.Fragment>
                   )}
                  style={{ width:300 }}
                  renderInput={ params=> <TextField {...params} label="section list"variant="outlined"
                  />}
               />
            <TextField
            id="outlined-name"
            label="operation_title"
            defaultValue=""
            className={classes.textField}
            value={operations.operation_title}
            onChange={handleChange("operation_title")}
            margin="normal"
            variant="outlined"
          />        
          <TextField
            id="outlined-name"
            label="operation_description"
            defaultValue=""
            className={classes.textField}
            value={operations.operation_description}
            onChange={handleChange("operation_description")}
            margin="normal"
            variant="outlined"
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" >Cancle</Button>
            <Button onClick={props.handleClose} color="primary" type="submit">Save</Button>
          </DialogActions>       
      </form>
        </Dialog>
        </Paper>
      </Fragment>
    );
  };
  
  export default AddOperations;
  