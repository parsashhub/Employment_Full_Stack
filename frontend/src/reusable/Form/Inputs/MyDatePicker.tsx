import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { format, isValid } from "date-fns";
// import { isValid, format } from 'date-fns-jalali';

/*
  as easy as u can see in the array file of formGenerator page:)
*/

const MyDatePicker = ({ formik, inputData }) => {
  const { name, label, required, disabled, others } = inputData;
  const { values, touched, errors, handleBlur, setFieldValue } = formik;
  const error = touched[name] && errors[name];

  return (
    <DatePicker
      value={values[name]}
      label={label}
      mask='____/__/__'
      onBlur={handleBlur}
      onChange={(newValue) => {
        setFieldValue(
          name,
          // isValid(newValue) ? format(newValue, 'yyyy/MM/dd') : newValue,
          newValue,
        );
      }}
      disabled={disabled}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name={name}
            onBlur={handleBlur}
            helperText={error}
            error={!!error}
            required={required}
            variant='outlined'
            fullWidth
          />
        );
      }}
      {...others}
    />
  );
};

export default MyDatePicker;
