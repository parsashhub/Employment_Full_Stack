import React from "react";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format, isValid } from "date-fns";
import { typeOnlyNumber } from "../FormikCustomHook";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

/*
  as easy as u can see in the array file of formGenerator page:)
*/

const MyTimePicker = ({ formik, inputData }) => {
  const { name, label, required, disabled, others } = inputData;
  const { values, touched, errors, setFieldValue } = formik;
  const error = touched[name] && errors[name];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={label ?? ""}
        value={values[name]}
        onChange={(value) => {
          setFieldValue(name, value);
        }}
        ampm={false}
        minutesStep={5}
        openTo="hours"
        views={["hours", "minutes"]}
        inputFormat="HH:mm"
        mask="__:__"
        disableMaskedInput
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            helperText={error}
            error={!!error}
            required={required}
            autoComplete="off"
            // onKeyDown={(e) => e.preventDefault()}
            variant="outlined"
            fullWidth
            {...params}
          />
        )}
        {...others}
      />
    </LocalizationProvider>
  );
};

export default MyTimePicker;
