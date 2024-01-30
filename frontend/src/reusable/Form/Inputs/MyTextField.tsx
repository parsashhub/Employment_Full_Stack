import React from "react";
import TextField from "@mui/material/TextField";

/*
  in "others" you can almost pass every thing u want:) inputProps and stuff
*/

const MyTextField = ({ formik, inputData }) => {
  const { name, label, required, others } = inputData;
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const error = touched[name] && errors[name];

  return (
    <TextField
      id={name}
      name={name}
      label={label ?? ""}
      value={values[name] ?? ""}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={error}
      error={!!error}
      required={!!required}
      variant="outlined"
      fullWidth
      {...others}
    />
  );
};

export default MyTextField;
