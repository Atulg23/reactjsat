import React, { Fragment, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import { Theme, makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";



const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  menu: {
    width: 200
  }
}));

const DropDown = ({ id, label, values, handleChange, data }) => {
  const classes = useStyles(0);
  return (
    <TextField
      id={id}
      select
      label={label}
      className={classes.textField}
      value={values}
      onChange={handleChange(`${id}`)}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      margin="normal"
      variant="outlined"
    >
      {data.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default DropDown;
