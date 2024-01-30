import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import clsx from "clsx";

/*
  "labelPlacement" of each checkBox could be bottom, end, start, top.
  "color" could be default, primary, secondary, 404, info, success, warning based on your MUI theme.
  "disabled" you can either disable the whole group of checkboxes or just one checkbox in the group.
  "rowWise" is value u can pass in others and u can either render ur checkboxes in columns or rows.
  for checking a config u can check formGenerator file or page on this project.
*/

const MyCheckbox = ({ formik, inputData }) => {
  const { name, label, required, options, others } = inputData;
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const error = touched[name] && errors[name];

  return (
    <FormControl
      className={clsx(others?.className ?? "", "flex")}
      disabled={others?.disabled}
      required={required}
      error={!!error}
      variant="outlined"
      fullWidth
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup
        className={`flex ${others?.rowWise ? "flex-row" : "flex-col"}`}
      >
        {options &&
          options?.map((option) => {
            const { id, value, ...rest } = option;
            return (
              <FormControlLabel
                key={option?.id}
                control={
                  <Checkbox
                    name={name}
                    checked={values[name]?.includes(String(option?.id))}
                    value={option?.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={others?.color ?? "secondary"}
                    {...rest}
                  />
                }
                label={option?.value ?? ""}
                labelPlacement={others?.labelPlacement ?? "start"}
              />
            );
          })}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default MyCheckbox;
