import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { margin } from "@mui/system";
/*
  for Rating components u just pass name, label, and anything
  else which we handle it with ...rest.
  but, what if u want to have ur custom icons for ur Rating.
  u can just pass customIcons prop like the array file in formGenerator page.
*/

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const MyRating = ({ formik, inputData }) => {
  const { name, label, customIcons, ...rest } = inputData;
  const { values } = formik;

  const IconContainer = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  };

  return (
    inputData && (
      <>
        <Typography component="legend">{label}</Typography>
        {customIcons ? (
          <StyledRating
            name={name}
            value={values[name]}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            onChange={(event, newValue) => {
              formik.setFieldValue(name, newValue);
            }}
            highlightSelectedOnly
            className="my-6"
            {...rest}
          />
        ) : (
          <Rating
            name={name}
            precision={0.5}
            value={values[name]}
            onChange={(event, newValue) => {
              formik.setFieldValue(name, newValue);
            }}
            className="my-6"
            {...rest}
          />
        )}
      </>
    )
  );
};

export default MyRating;
