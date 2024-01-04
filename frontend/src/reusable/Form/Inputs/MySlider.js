import React from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

/*
  for this component u can use both slider and range in one component
  u just pass name, label, leftChild, rightChild, required, disabled,
  and anything else which is handled with ...rest.
  for more information u can either check MUI document or just look up
  the array file in formGenerator page.
*/

const MySelect = ({ formik, inputData }) => {
  const { name, label, leftChild, rightChild, required, disabled, ...rest } =
    inputData;
  const { values, touched, errors, handleChange } = formik;
  const error = touched[name] && errors[name];

  return (
    inputData && (
      <FormControl
        required={required}
        disabled={disabled}
        variant="outlined"
        fullWidth
        error={!!error}
      >
        <FormLabel>{label}</FormLabel>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {leftChild}
          <Slider
            name={name}
            value={values[name]}
            onChange={handleChange}
            {...rest}
          />
          {rightChild}
        </Stack>
        <FormHelperText style={{ color: "#F44336" }}>{error}</FormHelperText>
      </FormControl>
    )
  );
};

export default MySelect;
