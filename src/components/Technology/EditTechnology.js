import React, { Fragment,useEffect,useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
//import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
import  Autocomplete  from '@material-ui/lab/Autocomplete';


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



const EditTechnology = (props) => {

    const classes = useStyles(0);
    const initialInputs = {  
        name:props.viewEdit.name,  
        short_name: props.viewEdit.short_name,  
        description: props.viewEdit.description,
        parent_id:props.viewEdit.parent_id,
    }
 //   console.log(initialInputs);
    const [values, setValues] = React.useState(initialInputs)
    const[technology, setTechnology] = useState([]);
    let technologyData = [];
    useEffect(() => {
       console.log("Getting users");
       instance.get('/technologys/')
            .then(response => {
                //console.log(response.data)
              
                for (const key in response.data) {
                    technologyData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        short_name: response.data[key].short_name,
                        description: response.data[key].description,
                        version:response.data[key].version,
                        parent_id: response.data[key].parent_id,
                        
                        
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
        console.log(values);
           let updatedName, updatedShortName,updatedDescription,updatedVersion,updatedParentId;

           if(values.name)
                updatedName=values.name;
           else
                updatedName=props.viewEdit.name;
            
            if(values.short_name)
                updatedShortName=values.short_name;
            else
                updatedShortName=props.viewEdit.short_name;
             
            if(values.description)
            updatedDescription=values.description;
            else
            updatedDescription=props.viewEdit.description;

            if(values.version)
                updatedVersion=values.version;
            else
            updatedVersion=props.viewEdit.version;

            if(values.technologyData)
                updatedParentId=values.technologyData.id;   
            else 
                updatedParentId=props.viewEdit.parent_id;  
           
            // console.log(values.technologyData.id)
            // console.log(updatedParentId);
            // console.log(updatedName);
           
           
                let data={
                    name: updatedName ,
                    short_name: updatedShortName , 
                    description: updatedDescription,
                    version:updatedVersion,
                    parent_id: updatedParentId

                 }
           
                console.log(data)
       
           instance.put(`/technologys/${props.viewEdit.id}`,data)
           .then(res => {
           console.log(res);
            swal({
                title: "Done!",
                text: "Record Updated Successfully!",
                icon: "success",
                timer: 1000,
                button: false
           })
           props.editInput(data);
           
            })
            .catch(error=>{console.log(error)})
 
    }
   

    return (
        <Fragment>
            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Technology</DialogTitle>    
                <form onSubmit={handleSubmit}>         
                    <DialogContent>               
                    <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter Technology Name"
                            defaultValue={props.viewEdit.name}
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
                            defaultValue={props.viewEdit.short_name}
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
                            defaultValue={props.viewEdit.description}
                            className={classes.textField}
                            value={values.description}
                            onChange={handleChange("description")}
                            margin="normal"
                            variant="outlined"
                        />
                         <TextField style={{width:"45%"}}
                            required
                            id="outlined-name"
                            label="Enter Technology's version"
                            defaultValue={props.viewEdit.version}
                            className={classes.textField}
                            value={values.version}
                            onChange={handleChange("version")}
                            margin="normal"
                            variant="outlined"
                        />
                        <Autocomplete
                                id="Technology List"
                                label={props.viewEdit.id}
                                options={technology}
                                getOptionLabel={option=>option.name}
                                //defaultValue={props.viewEdit.parent_id}
                                value
                                onChange={(event,technologyData)=>
                                    {
                                    setValues({...values,technologyData});
                                    } }
                                renderOption={option=> (
                                <React.Fragment>
                                <b>{option.id}</b>&emsp;{option.name}
                                </React.Fragment>
                                )}
                                style={{ width:300 }}
                                renderInput={ params=> <TextField {...params}  label="Select Parent" variant="outlined"
                                />}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={props.handleClose}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditTechnology;
