import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material";
import clsx from "clsx";

/*
  "labelPlacement" of each checkBox could be bottom, end, start, top.
  "color" could be default, primary, secondary, error, info, success, warning based on your MUI theme.
  "disabled" you can either disable the whole group of checkboxes or just one checkbox in the group.
  for checking a config u can check formGenerator file or page on this project.
*/

const MyGroupedCheckbox = ({ formik, inputData }) => {
  const { name, label, required, options, others } = inputData;
  const { values, touched, errors, setFieldValue, handleChange } = formik;
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
      <FormGroup>
        {options &&
          options?.map((option) => {
            const { id, value, parent, ...rest } = option;
            return parent ? (
              <Stack key={option.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={name}
                      checked={values[name]?.includes(String(option?.id))}
                      value={option?.id}
                      onChange={(e) => {
                        handleChange(e);
                        values[name].push(parent.map(({ id }) => id));
                      }}
                      // indeterminate={values[name].includes(String(11))}
                      {...rest}
                    />
                  }
                  label={option?.value ?? ""}
                  labelPlacement={others?.labelPlacement ?? "start"}
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  {parent?.map(({ value, id }) => {
                    return (
                      <FormControlLabel
                        key={id}
                        control={
                          <Checkbox
                            name={name}
                            value={id}
                            checked={
                              values[name]?.includes(String(id)) ||
                              values[name]?.includes(String(option.id))
                            }
                            onChange={handleChange}
                            {...rest}
                          />
                        }
                        label={value ?? ""}
                        labelPlacement={others?.labelPlacement ?? "start"}
                      />
                    );
                  })}
                </Box>
              </Stack>
            ) : (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    name={name}
                    value={id}
                    checked={values[name].includes(String(id))}
                    onChange={handleChange}
                    {...rest}
                  />
                }
                label={value}
                labelPlacement={others?.labelPlacement ?? "start"}
              />
            );
          })}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default MyGroupedCheckbox;
