import React from "react";
import Switch from "@mui/material/Switch";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

/*
  for Switch components u can easily pass name, label
  and some optional props like required or disabled
  or anything else which is handled with ...rest
  (u can either check MUI document or array file in formGenerator page).
*/

const MySwitch = ({ formik, inputData }) => {
  const { name, label, required, disabled, ...rest } = inputData;
  const { values, touched, errors, setFieldValue } = formik;
  const error = touched[name] && errors[name];

  return (
    inputData && (
      <FormControl
        component="fieldset"
        variant="standard"
        required={required}
        disabled={disabled}
        error={!!error}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <Switch
          name={name}
          value={values[name]}
          checked={values[name]}
          onChange={(e) => setFieldValue(name, e.target.checked)}
          {...rest}
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
  );
};

export default MySwitch;
