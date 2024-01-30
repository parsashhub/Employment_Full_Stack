import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import FormikHook, {
  createFormikObjects,
} from "../../../../reusable/Form/FormikHook";
import { useNavigate } from "react-router-dom";

function ProfileApp() {
  // @ts-ignore
  const user = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(false);
  const [handleDelete, setHandleDelete] = useState(() => () => {});
  const navigate = useNavigate();

  const formData = useMemo(
    () => [
      {
        type: "TextField",
        label: "نام",
        name: "firstname",
        init: user.firstname,
        validation: yup.string().min(3),
        grids: { xs: 12, sm: 12, md: 6 },
      },
      {
        type: "TextField",
        label: "نام خانوادگی",
        name: "lastname",
        init: user.lastname,
        validation: yup.string().min(3),
        grids: { xs: 12, sm: 12, md: 6 },
      },
      {
        type: "TextField",
        label: "شماره همراه",
        name: "phoneNumber",
        init: user.phoneNumber,
        validation: yup.string().min(10, ""),
        grids: { xs: 12, sm: 12, md: 6 },
      },
    ],
    [user],
  );
  const { initialValues, validationSchema } = createFormikObjects(formData);
  const [form, formik] = FormikHook(
    {
      inputData: formData,
      initialValues,
      validationSchema,
    },
    (values) => submitForm(values),
  );

  const submitForm = async (values: any) => {
    try {
      const res = await axios.put(`/users/${user.userId}`, values);
      // TODO: update user data in localstorage
      // dispatch(updateUserData(res.data?.data));
      toast.success(res.data.message[0]);
    } catch (e) {
      toast.error(e.response.data?.message[0]);
    }
  };

  return (
    <FusePageCarded
      header={
        <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
          <motion.span
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            // @ts-ignore
            delay={300}
          >
            <Typography className="flex text-24 md:text-28 font-bold tracking-tight">
              تنضیمات حساب کاربری
            </Typography>
          </motion.span>
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
            ویرایش اطلاعات
          </Button>
          <Button
            variant="contained"
            color="error"
            className="mt-24 w-2/3 rounded-8"
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
              setHandleDelete(() => async () => {
                setOpen(false);
                await Promise.all([axios.post("/users/deleteAccount")]);
                navigate("/sign-out");
              });
            }}
          >
            درخواست حذف حساب کاربری
          </Button>
        </motion.div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
