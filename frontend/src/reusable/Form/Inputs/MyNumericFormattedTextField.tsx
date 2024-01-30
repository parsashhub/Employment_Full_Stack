import React from "react";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

/*
  first check https://s-yadav.github.io/react-number-format/docs/numeric_format
  for more information about the props you want to pass to this component.
  do not forget u can pass any props that MUI TextField accept az a valid Props,
  and the Props for the NumericFormatter too. (...rest will handle it)
*/

const NumericFormattedTextField = ({ formik, inputData }) => {
  const { name, label, required, ...rest } = inputData;
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const error = touched[name] && errors[name];

  return (
    <NumericFormat
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      customInput={TextField}
      thousandSeparator=","
      label={label ?? ""}
      error={!!error}
      helperText={error}
      variant="outlined"
      sx={{ width: "100%" }}
      {...rest}
    />
  );
};

export default NumericFormattedTextField;
