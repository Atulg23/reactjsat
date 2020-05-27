import React, { Fragment,useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
 import swal from 'sweetalert';
// import Paper from '@material-ui/core/Paper';
import  Autocomplete  from '@material-ui/lab/Autocomplete';



// const status = [
//     {
//       value: "true",
//       label: "true"
//     },
//     {
//       value: "false",
//       label: "false"
//     }
// ]


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



const AddTechnology = (props) => {
    const classes = useStyles(0);
    
    const initialInputs = {name: "", short_name: "", description:"",version:"",parent_id: 0}
    
    const [values, setValues] = React.useState(initialInputs)
  
    const[technology, setTechnology] = useState([]);
    let technologyData = [];
    useEffect(() => {
      // console.log("Getting users");
       instance.get('/technologys/')
            .then(response => {
              //  console.log(response.data)
              
                for (const key in response.data) {
                    technologyData.push({
                        id: response.data[key].id,
                        name: response.data[key].name
                    })
                   
                }
                setTechnology(technologyData)
              
            })
           // console.log(customer)

    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
       // console.log(values);
       let newParentId ;
         if(values.technologyData)
             newParentId=values.technologyData.id;
         else
         newParentId = values.parent_id;

             let data={
                name: values.name,
                short_name: values.short_name,
                description: values.description,
                parent_id: newParentId,
                version:values.version
            }
          //  console.log(data);
            //console.log(values.parent_id);
         //  console.log(values.technologyData.id);
            
            instance.post('/technologys/',data)
            .then((response) => {
                //console.log(response);
               
              }, (error) => {
                //console.log(error);
              });
             
              swal({
                title: "Done!",
                text: "Record Added Successfully!",
                icon: "success",
                timer: 1000,
                button: false
           })
           props.addInput(data);
    }


    return (
        <Fragment>
            <Dialog
                open={props.add}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Technology</DialogTitle>    
                <form onSubmit={handleSubmit}>         
                    <DialogContent>               
                    <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter Technology Name"
                            defaultValue=""
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField  style={{width:"45%",marginLeft:"50px"}}
                            required
                            id="outlined-name"
                            label="Enter Short Name"
                            defaultValue=""
                            className={classes.textField}
                            value={values.short_name}
                            onChange={handleChange("short_name")}
                            margin="normal"
                            variant="outlined"
                        />
                         <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter Technology Description"
                            defaultValue=""
                            className={classes.textField}
                            value={values.description}
                            onChange={handleChange("description")}
                            margin="normal"
                            variant="outlined"
                        />
                      
                         <TextField style={{width:"45%",marginLeft:"50px"}}
                            required
                            id="outlined-name"
                            label="Enter Technology's Version"
                            defaultValue=""
                            className={classes.textField}
                            value={values.version}
                            onChange={handleChange("version")}
                            margin="normal"
                            variant="outlined"
                        />
                        <Autocomplete 
                         id="Technology List"
                        options={technology}
                        getOptionLabel={option=>option.name}
                        onChange={(event,technologyData)=>
                            {
                            setValues({...values,technologyData});
                            } }
                        renderOption={option=> (
                        <React.Fragment>
                        <b>{option.id}</b>&emsp;{option.name}
                        </React.Fragment>
                        )}
                        style={{ width:"30%" }}
                        renderInput={ params=> <TextField {...params} label="Select Parent"variant="outlined"
                        />}
                  />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit"  onClick={props.handleClose}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default AddTechnology;
