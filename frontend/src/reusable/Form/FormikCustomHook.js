import React, { useCallback, useMemo } from "react";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import TextField from "./Inputs/MyTextField";
import DatePicker from "./Inputs/MyDatePicker";
import Autocomplete from "./Inputs/MyAutocomplete";
import Select from "./Inputs/MySelect";
import Upload from "./Inputs/MyUpload";
import Checkbox from "./Inputs/MyCheckbox";
import RadioGroup from "./Inputs/MyRadioGroup";
import Rating from "./Inputs/MyRating";
import Switch from "./Inputs/MySwitch";
import Slider from "./Inputs/MySlider";
import MultiSelect from "./Inputs/MyMultiSelect";
import GroupedCheckbox from "./Inputs/MyGroupedCheckbox";
import TimePicker from "./Inputs/MyTimePicker";
import NumericTextField from "./Inputs/MyNumericFormattedTextField";
import PatternTextField from "./Inputs/MyPatternFormattedTextField";
import AdvancePickers from "./Inputs/MyAdvancePickers";

export const Components = {
  DatePicker,
  TextField,
  Autocomplete,
  Select,
  MultiSelect,
  Upload,
  Checkbox,
  GroupedCheckbox,
  RadioGroup,
  Rating,
  Switch,
  Slider,
  TimePicker,
  NumericTextField,
  PatternTextField,
  AdvancePickers,
};

export const createFormikObjects = (data) => {
  const initialValues = {};
  const validationObj = {};
  data.map((field) => {
    const { name, init, validation } = field;
    initialValues[name] = init ?? "";
    if (validation) validationObj[name] = validation;
  });
  return { initialValues, validationSchema: yup.object(validationObj) };
};

export const mapCreateElement = ({ type, ...rest }, formik) => {
  const TheComponent = Components[type];
  return <TheComponent formik={formik} inputData={{ ...rest }} />;
};

const FormikHook = (config, onSubmit) => {
  if (typeof onSubmit !== "function" || typeof config !== "object") {
    console.error(
      "\tpass valid arguments:)\n\tConfig must be an object and onSubmit must be a function"
    );
    return [null, null];
  }

  const formik = useCallback(
    useFormik({
      initialValues: config.initialValues,
      validationSchema: config.validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    }),
    [onSubmit, config]
  );

  const form = useMemo(() => {
    return (
      <form className="w-full" onSubmit={formik?.handleSubmit}>
        <Grid container spacing={config?.spacing ?? 2}>
          {config?.inputData?.map((field) => {
            if (field?.type === "Empty") {
              return <Grid item xs={12} md={12} key={field.name}></Grid>;
            } else if (field?.type === "Custom") {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  xl={4}
                  key={field.name}
                  {...field?.grids}
                >
                  {field?.component}
                </Grid>
              );
            } else {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  xl={4}
                  key={field.name}
                  {...field?.grids}
                >
                  {mapCreateElement(field, formik)}
                </Grid>
              );
            }
          })}
        </Grid>
        {config?.defaultSubmitButton ? (
          <Button
            className="rounded-8 min-w-96 m-5"
            color="secondary"
            variant="contained"
            type="submit"
          >
            {config?.submitBtnText ?? "submit button"}
          </Button>
        ) : null}
      </form>
    );
  }, [formik, config]);

  return [form, formik];
};

export default FormikHook;

export const typeOnlyNumber = (event) => {
  if (event.code === "KeyC" || event.code === "KeyV" || event.code === "KeyA") {
    if (!event.ctrlKey) {
      event.preventDefault();
    }
  } else if (
    !(
      event.key === "Backspace" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      /\d/.test(event.key)
    )
  ) {
    event.preventDefault();
  }
};
