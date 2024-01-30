import React, { useMemo, useState } from "react";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Icon, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import FusePageCarded from "@fuse/core/FusePageCarded";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import {FIELD_REQUIRED, MIN_LENGTH_PASSWORD} from "../../../../reusable/messages";
import FormikHook, {createFormikObjects} from "../../../../reusable/Form/FormikHook";

function ChangePasswordApp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const formData = useMemo(
    () => [
      {
        type: "TextField",
        label: "رمز عبور فعلی",
        name: "currentPassword",
        validation: yup
          .string()
          .min(6, MIN_LENGTH_PASSWORD)
          .required(FIELD_REQUIRED),
        others: {
          type: showPassword ? "text" : "password",
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  onClick={() => setShowPassword((pre) => !pre)}
                  className="text-24 cursor-pointer"
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </Icon>
              </InputAdornment>
            ),
          },
        },
        grids: { xs: 12, sm: 12, md: 6 },
      },
      {
        type: "TextField",
        label: "رمز عبور جدید",
        name: "newPassword",
        validation: yup
          .string()
          .required(FIELD_REQUIRED)
          .min(8, MIN_LENGTH_PASSWORD)
          .matches(
            /(?=.*[a-z])(?=.*[A-Z])\w+/,
            "رمز عبور باید حداقل یک کاراکتر بزرگ و کوچک داشته باشد"
          )
          .matches(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد")
          .matches(
            /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
            "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"
          ),
        others: {
          type: showNewPassword ? "text" : "password",
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  onClick={() => setShowNewPassword((pre) => !pre)}
                  className="text-24 cursor-pointer"
                >
                  {showNewPassword ? "visibility" : "visibility_off"}
                </Icon>
              </InputAdornment>
            ),
          },
        },
        grids: { xs: 12, sm: 12, md: 6 },
      },
      {
        type: "TextField",
        label: "تکرار رمز عبور جدید",
        name: "confirmNewPassword",
        validation: yup.string().when("newPassword", (password, field) => {
          if (password) {
            return field
              .required(FIELD_REQUIRED)
              .oneOf([yup.ref("newPassword")], "رمز عبورها یکسان نیستند");
          }
        }),
        grids: { xs: 12, sm: 12, md: 6 },
      },
    ],
    [showPassword, showNewPassword]
  );

  const { initialValues, validationSchema } = createFormikObjects(formData);
  const [form, formik] = FormikHook(
    {
      inputData: formData,
      initialValues,
      validationSchema,
    },
    (values) => submitForm(values)
  );

  const submitForm = async (values) => {
    let data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    try {
      const res = await axios.post("/users/changePassword", data);
      toast.success(res.data.message[0]);
    } catch (e) {
      toast.error(e.response.data.messages[0] ?? e.message);
    }
  };

    return (
    <FusePageCarded
      header={
        <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            className="flex text-24 md:text-28 font-bold tracking-tight"
          >
            تغییر رمز عبور
          </Typography>
        </div>
      }
      content={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="flex flex-col justify-center items-center w-full max-w-5xl mx-auto p-24 sm:p-32"
        >
          {form}
          <Button
            variant="contained"
            color="secondary"
            className="mt-24 w-2/3 rounded-8"
            size="large"
            onClick={() => formik?.handleSubmit()}
            disabled={!formik?.dirty}
          >
            تغییر رمز عبور
          </Button>
        </motion.div>
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default ChangePasswordApp;
