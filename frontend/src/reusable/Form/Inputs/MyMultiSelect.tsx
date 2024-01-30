import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

/*
  if u want field as a required field u can pass required in ur config
  for disabling u can either disable the whole select or just disable
  and last but not least, check the array file in formGenerator page
  to see how the multi select config work.
*/

const MyMultiSelect = ({ formik, inputData }) => {
  const { name, label, required, disabled, renderMenuItem, options, ...rest } =
    inputData;
  const { values, touched, errors, handleBlur, setFieldValue } = formik;
  const error = touched[name] && errors[name];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(name, typeof value === "string" ? value.split(",") : value);
  };

  return (
    inputData && (
      <FormControl
        required={required}
        disabled={disabled}
        variant="outlined"
        fullWidth
      >
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          name={name}
          id={name}
          label={label}
          error={!!error}
          value={values[name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          {...rest}
        >
          {renderMenuItem(options, values[name])}
        </Select>
        <FormHelperText style={{ color: "#F44336" }}>{error}</FormHelperText>
      </FormControl>
    )
  );
};

export default MyMultiSelect;
