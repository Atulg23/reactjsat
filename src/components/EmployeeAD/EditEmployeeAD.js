import React, { Fragment,useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles, Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import instance from '../../common/instance';
import swal from 'sweetalert';



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



const EditEmployeeAD = (props) => {

    const [employee,setEmployees]=useState([]);
    let employeeData=[]; 
    useEffect(()=>{
        console.log("Getting users");
        instance.get('/employees/')
        .then(response => {
          //console.log(response.data.employees)
          for(const key in response.data){
            employeeData.push({
             employee_id:response.data[key].employee_id
            })
         
          }
          setEmployees(employeeData)
         // console.log(employeeData)
        })
      
    },[])
  

    const data1= [];
      employee.forEach((e) => {
            data1.push(e.employee_id)
            // .slice(4,7)
      });
     console.log(data1);

    // console.log(employee);



    const classes = useStyles(0);
    const initialInputs = {  
            id:props.viewEdit.id,
            is_valid_user:props.viewEdit.is_valid_user,
            is_on_boarding: props.viewEdit.is_on_boarding,
            display_name: props.viewEdit.display_name,
            email:props.viewEdit.email,
            first_name: props.viewEdit.first_name,
            last_name:props.viewEdit.last_name ,
            employee_id:props.viewEdit.employee_id ,
            middle_name: props.viewEdit.middle_name,
            is_active:true,        
        }
       

    const [values, setValues] = useState(initialInputs)

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
        

    };
   

    let FirstName,LastName,MiddleName,EmployeeId,DisplayName;

const handleSubmit = (e) => {
        e.preventDefault()
        console.log("In method")

    if(values.employee_id)
        EmployeeId=values.employee_id;
    else
        EmployeeId=props.viewEdit.employee_id;
    if(values.first_name)
        FirstName=values.first_name;
    else
        FirstName=props.viewEdit.first_name;
    if(values.last_name)
        LastName=values.last_name;
    else
        LastName=props.viewEdit.last_name;
    if(values.middle_name)
        MiddleName=values.middle_name;
    else
        MiddleName=props.viewEdit.middle_name;
    
    if(values.display_name)
        DisplayName=values.display_name;
    else
        DisplayName=props.viewEdit.display_name;
   
   
   
    let data={ 
            display_name: DisplayName,
            last_name:LastName,
            employee_id:"NIPL"+ EmployeeId ,
            middle_name: MiddleName,
            first_name: FirstName,
            is_on_boarding: true, 
         }
console.log(data.employee_id);
        for(let i=0; i<=data1.length; i++){
            if(data.employee_id === data1[i]){
                swal({
                    title: "Employee Id is Already Existed!!",
                    text: "Pease Try Again with Unique Employee Id !",
                    icon: "warning",
                    button: true,
                  })
   
            }
            else{
            console.log("success")
           instance.put(`/ademployees/${props.viewEdit.id}`,data)
           swal({
            title:"Done!",
            text:"Employee On Boarding Successfully",
            icon:"success",
            timer:1000,
            button:false
                    })
           .then(res => {
           //console.log(res);
            props.addEmployee(data,props.viewEdit.id)
            })
            .catch(error=>{console.log(error)})
        }
            break;
             
           }
  
           
            
   
    }


    
    
 

    return (
        <Fragment>
            <Dialog
                open={props.edit}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">AD Employees Details</DialogTitle>    
                <form onSubmit={handleSubmit}>         
                    <DialogContent> 
                    {/* <label for="employee_id">EmployeeId</label> */}
                    <TextField  style={{width:"45%"}}
                            id="outlined-name employee_id"
                            label="Enter Unique Employee_Id"
                            defaultValue=""
                            className={classes.textField}
                            required={true} 
                            type="number"
                            maxLength={3}
                            
                            characterLimit={3}  
                            onInput={(e)=>{  e.target.value = Math.max( e.target.value ,0).toString().slice(0,3)
                            }}
                            // InputProps={{inputProps:{max:3,min:1}}}
                            name="employee_id"
                            onChange={handleChange("employee_id")}
                            margin="normal"
                            variant="outlined"
                        />   <br/>
                    <TextField  style={{width:"30%"}}
                            required={true}
                            id="outlined-name"
                            label="Enter First Name"
                            defaultValue={props.viewEdit.first_name}
                            className={classes.textField}
                           
                            onChange={handleChange("first_name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField  style={{width:"31%",marginLeft:"10px"}}
                            required={true}
                            id="outlined-name"
                            label="Enter Middle Name"
                            defaultValue={props.viewEdit.middle_name}
                            className={classes.textField}
                          
                            onChange={handleChange("middle_name")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField  style={{width:"30%",marginLeft:"10px"}}
                            required={true}
                            id="outlined-name"
                            label="Enter Last Name"
                            defaultValue={props.viewEdit.last_name}
                            className={classes.textField}
                            onChange={handleChange("last_name")}
                            margin="normal"
                            variant="outlined"
                        />           
                    <TextField 
                            required={true}
                            id="outlined-name"
                            label="Enter Display Name"
                            defaultValue={props.viewEdit.display_name}
                            className={classes.textField}
                            onChange={handleChange("display_name")}                           
                            margin="normal"
                            variant="outlined"
                        />
            
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary"> Cancel </Button>
                        <Button color="primary" type="submit" onClick={()=>props.handleClose}>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default EditEmployeeAD;
