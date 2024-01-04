import React from "react";
import TextField from "@mui/material/TextField";
import { PatternFormat } from "react-number-format";

/*
  first check https://s-yadav.github.io/react-number-format/docs/pattern_format/
  for more information about the props you want to pass to this component.
  do not forget u can pass any props that MUI TextField accept az a valid Props,
  and the Props for the PatternFormatter too. (...rest will handle it)
  if you are using this in a ltr site u should pass the sx in your config,
  and remove the direction.
*/

const PatternFormattedTextField = ({ formik, inputData }) => {
  const { name, label, required, ...rest } = inputData;
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const error = touched[name] && errors[name];

  return (
    <PatternFormat
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      customInput={TextField}
      label={label ?? ""}
      error={!!error}
      helperText={error}
      variant="outlined"
      sx={{
        width: "100%",
        "& input": {
          direction: "rtl",
        },
      }}
      {...rest}
    />
  );
};

export default PatternFormattedTextField;
