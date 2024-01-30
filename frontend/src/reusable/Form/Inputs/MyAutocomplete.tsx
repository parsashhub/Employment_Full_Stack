import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";

/*
  for this component except passing required, disabled, name, label,
  there is two important things you should be careful about.
  first in others you can pass a AutocompleteProps which is everything that u want your
  Autocomplete components have, and there is one more
  which is the TextField props that you can pass everything that your TextField need.
  however, you can pass anything you want according to MUI documentation.
*/

const MyAutocomplete = ({ formik, inputData }) => {
  const { name, label, data, required, disabled, others } = inputData;
  const { values, touched, errors, setFieldValue } = formik;
  const error = touched[name] && errors[name];
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      name={name}
      value={data.includes(values[name]) ? values[name] : null}
      onChange={(event, newValue) => {
        setFieldValue(name, newValue ?? "");
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={data ?? []}
      disableListWrap
      openOnFocus
      fullWidth
      blurOnSelect
      disabled={disabled}
      {...others?.AutocompleteProps}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error && errors[name]}
          variant="outlined"
          required={required}
          {...others?.TextFieldProps}
        />
      )}
    />
  );
};
export default MyAutocomplete;
