import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { Theme, makeStyles } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";



const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginLeft: theme.spacing(1)
  }
}));

const DatePicker = ({ label, id }) => {
  const classes = useStyles(0);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date()
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
        
          disableToolbar
          className={classes.textField}
          variant="dialog"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="normal"
         
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        /> */}
        <KeyboardDatePicker
          margin="normal"
          id={id}
          label={label}
         // format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
 
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
