import React from "react";
import TextField from "@mui/material/TextField";
import { Icon, InputAdornment } from "@mui/material";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// import different calendars
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import jalali from "react-date-object/calendars/jalali";
import arabic from "react-date-object/calendars/arabic";

// import different languages for picker
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import arabic_ar from "react-date-object/locales/arabic_ar";

/*
  for simplicity to pass props to apply your kinda languages and calendars just pass the
  first two letter of them as string. for instance, to have a gregorian calendar u should pass
  calendar : "gr" in your config object. (for passing language use the same logic)
  persian is set on default:)
*/

/*
  you can check the full documentation https://shahabyazdi.github.io/react-multi-date-picker/fa.
  this component will handle all the kinds of datePicker, timePicker, rangePicker, monthPicker, etc.
  it will accept a children prop if u want to show additional elements below the Picker you are currently using.
  if you want to have a multiselect picker just pass multiple in the pickerProps object.
  if you just want to pick among the months you can easily pass onlyMonthPicker, or onlyYearPicker,weekPicker, etc.
  if you want a range picker just pass range to this component. (you can pass rangeHover too).
  it also has a min and max for validating or disabling some dates u do not want your user to choose
  minDate={new DateObject({ calendar: persian }).toFirstOfMonth()} or minDate="1399/9/18"
  maxDate={new DateObject({ calendar: persian }).toLastOfMonth()}
  as Ez as you can see!
  you can have different kinds of formats, I recommend to check the document to find your ideal format type.
  if you just want a timePicker you can pass a prop called "disableDayPicker",
  format="HH:mm:ss A?(this is optional)", plugins={[ <TimePicker /> ]}.
  for handling events check https://shahabyazdi.github.io/react-multi-date-picker/fa/events/.
*/

const AdvancePickers = ({ formik, inputData }) => {
  const {
    name,
    label,
    required,
    disabled,
    locale,
    calendar,
    textFieldProps,
    pickerProps,
  } = inputData;
  const { values, touched, errors, setFieldValue } = formik;
  const error = touched[name] && errors[name];

  return (
    <DatePicker
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
      containerStyle={{
        width: "100%",
      }}
      calendarPosition="bottom-center"
      format="YYYY/MMMM/DD"
      calendar={
        calendar === "pe"
          ? persian
          : calendar === "gr"
          ? gregorian
          : calendar === "ja"
          ? jalali
          : calendar === "ar"
          ? arabic
          : persian
      }
      locale={
        locale === "pe"
          ? persian_fa
          : locale === "gr"
          ? gregorian_en
          : locale === "ar"
          ? arabic_ar
          : persian_fa
      }
      onChange={(element) => {
        if (!pickerProps.timePicker) {
          setFieldValue(name, element);
        } else setFieldValue(name, new DateObject(element).format());
      }}
      render={(value, openCalendar) => (
        <TextField
          onFocus={openCalendar}
          value={values[name]}
          label={label ?? ""}
          helperText={error}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {pickerProps?.disableDayPicker ? (
                  <AccessTimeIcon />
                ) : (
                  <Icon>event</Icon>
                )}
              </InputAdornment>
            ),
          }}
          disabled={disabled}
          required={required}
          autoComplete="off"
          variant="outlined"
          fullWidth
          {...textFieldProps}
        />
      )}
      {...pickerProps}
    />
  );
};

export default AdvancePickers;
