import React, { Fragment, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
//import DropDown from '../../common/DropDown';
import swal from 'sweetalert';
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



const EditDomain = (props) => {

    const classes = useStyles(0);
    const initialInputs = {
        name: props.viewEdit.name,
        desription: props.viewEdit.desription,
        parent_id: props.viewEdit.parent_id,
    }
    const [values, setValues] = React.useState(initialInputs)
    const [domains, setDomains] = useState([]);
    let domainsData = [];
    useEffect(() => {
        console.log("Getting users");
        instance.get('/domains/')
            .then(response => {
                console.log(response.data)

                for (const key in response.data) {
                    domainsData.push({
                        id: response.data[key].id,
                        name: response.data[key].name,
                        description: response.data[key].description,
                        parent_id: response.data[key].parent_id,
                    })

                }
                setDomains(domainsData)

            })


    }, [])


    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        let updatedName, updatedDescription, updatedParentId;

        if (values.name)
            updatedName = values.name;
        else
            updatedName = props.viewEdit.name;

        if (values.description)
            updatedDescription = values.description;
        else
            updatedDescription = props.viewEdit.description;


            if(values.domainsData)
                updatedParentId=values.domainsData.id;   
            else 
                updatedParentId=props.viewEdit.parent_id;  

        let data = {
            name: updatedName,
            description: updatedDescription,
            parent_id: updatedParentId,

        }

        // console.log(data)

        instance.put(`/domains/${props.viewEdit.id}`, data)
            .then(res => {
              //  console.log(res);
              
                swal({
                    title: "Done!",
                    text: "Record Updated Successfully!",
                    icon: "success",
                    timer: 1000,
                    button: false
                })
                props.editInput();
            })
            .catch(error => { console.log(error) })
           
    }


    return (
        <Fragment>
            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Domain</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField 
                            required
                            id="outlined-name"
                            label="Enter Domain Name"
                            defaultValue={props.viewEdit.name}
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange("name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField 
                            required
                            id="outlined-name"
                            label="Enter Domain Description"
                            defaultValue={props.viewEdit.description}
                            className={classes.textField}
                            value={values.code}
                            onChange={handleChange("description")}
                            margin="normal"
                            variant="outlined"
                        />
                        <p></p>
                        <Autocomplete
                            id="Domain List"
                            label={props.viewEdit.id}
                            options={domains}
                            getOptionLabel={option => option.name}
                            defaultValue={props.viewEdit.parent_id}
                            value
                            onChange={(event, domainsData) => {
                                setValues({ ...values, domainsData });
                            }}
                            renderOption={option => (
                                <React.Fragment>
                                    <b>{option.id}</b>&emsp;{option.name}
                                </React.Fragment>
                            )}
                           
                            renderInput={params => <TextField {...params} label="Select Domain" value={props.viewEdit.parent_id} variant="outlined"
                            />}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" defaultValue={values.id} onClick={props.handleClose}>Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditDomain;
