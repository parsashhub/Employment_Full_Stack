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
  one or more options of it based on ur usages.
  for adding category to menuItems u should pass a grouped equal true in config
  and a renderMenuItem which is a function.
  for more information check the array file in formGenerator page.
*/

const MySelect = ({ formik, inputData }) => {
  const {
    name,
    label,
    options,
    required,
    disabled,
    grouped,
    renderMenuItem,
    others,
  } = inputData;
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const error = touched[name] && errors[name];

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
          name={name}
          id={name}
          label={label}
          error={!!error}
          value={values[name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          {...others}
        >
          <MenuItem value="">
            <em>انتخاب نشده</em>
          </MenuItem>
          {grouped
            ? renderMenuItem(options)
            : options?.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  disabled={item?.disabled}
                >
                  {item.value}
                </MenuItem>
              ))}
        </Select>
        <FormHelperText style={{ color: "#F44336" }}>{error}</FormHelperText>
      </FormControl>
    )
  );
};

export default MySelect;
