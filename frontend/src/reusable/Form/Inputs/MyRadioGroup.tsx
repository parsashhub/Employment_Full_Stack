import React from "react";
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

/*
    "labelPlacement" of each radio could be bottom, end, start, top.
    "color" could be default, primary, secondary, 404, info, success, warning based on your MUI theme.
    "disabled" you can either disable the whole group of radioGroup or just one.
     "rowWise" is value u can pass in others and u can either render ur RadioGroup in columns or rows.
     for checking a config of RadioGroup u can check formGenerator file or page on this project.
   */

const MyRadioGroup = ({ formik, inputData }) => {
  const { name, label, required, disabled, options, others } = inputData;
  const { touched, errors } = formik;
  const error = touched[name] && errors[name];

  return (
    <FormControl
      disabled={disabled}
      required={required}
      variant="outlined"
      fullWidth
    >
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row={others?.rowWise ?? false}
        name={name}
        // @ts-ignore
        label={label}
        onChange={(event) => {
          formik.setFieldValue(name, event.target.value);
        }}
      >
        {options?.map((item) => {
          const { id, value, ...rest } = item;
          return (
            <FormControlLabel
              key={id}
              value={id}
              label={value}
              control={<Radio />}
              labelPlacement={others?.labelPlacement ?? "start"}
              {...rest}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText style={{ color: "#F44336" }}>{error}</FormHelperText>
    </FormControl>
  );
};

export default MyRadioGroup;
