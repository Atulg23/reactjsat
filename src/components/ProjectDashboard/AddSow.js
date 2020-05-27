import React,{Fragment} from 'react';
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import Input from '@material-ui/core/Input';
import DropDown from '../../common/DropDown';


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: "100%",
    },
    dropDown: {
        width: "78%",
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


const AddSow = (props) =>{
    const classes = useStyles(0); 
    const [values, setValues] = React.useState();

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values);
        let data = {
            project_id:props.proj_id.id,
            documents: values.documents,
        }
        console.log(data);
        instance.post(`/Resource_Allocation/projectsow/?project_id=${props.proj_id.id}`, data)
            .then((response) => {
                console.log(response);
               
                //swal("Good job!", "Record inserted successfully!", "success");
                
            }, (error) => {
                console.log(error);
            });
            props.addSow(data)
            props.handleClose(false)
    }
    return (
       <Fragment>
        <Dialog
            open={props.sow}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add SOW</DialogTitle>
       
            <DialogContent>
                
                <form>
                <label for="contained-button-file"><strong>Please Select File:</strong></label>
                <Input 
                   accept="*"
                    className={classes.input}
                   // id="contained-button-file"
                    onChange={handleChange("documents")}
                    type="file"
                />
                <br></br><br></br>
                <div>
                    <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
                        Upload
                    </Button>
                </div>
           
        </form>
        </DialogContent>

    </Dialog>
       </Fragment>
    );

}

export default AddSow;