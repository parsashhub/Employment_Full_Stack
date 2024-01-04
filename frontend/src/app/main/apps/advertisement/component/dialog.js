import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdvertisement,
  closeEditDialog,
  closeNewDialog,
  selectData,
  updateAdvertisement,
} from "../store/slice";
import WrapperDialog from "../../../../../reusable/Dialogs/myDialog";
import * as yup from "yup";
import FormikHook, {
  createFormikObjects,
  typeOnlyNumber,
} from "../../../../../reusable/Form/FormikCustomHook";
import { FIELD_REQUIRED } from "../../../../../reusable/messages";
import { Button, MenuItem, Typography } from "@mui/material";
import { selectUtilsData } from "app/store/utilsSlice";
import { dialogForm } from "../array";

const grids = { xs: 12, sm: 6, md: 6, xl: 4 };

const ExerciseDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectData("dialog"));
  const jobContracts = useSelector(selectUtilsData("jobContracts"));
  const jobCategories = useSelector(selectUtilsData("jobCategories"));

  const formData = useMemo(
    () => [
      ...dialogForm,
      {
        type: "Select",
        label: "نوع قرارداد",
        name: "contractId",
        validation: yup.string().required(FIELD_REQUIRED),
        options: jobContracts,
        grids: grids,
        grouped: true,
        renderMenuItem: (data) =>
          data?.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <div>
                  <Typography variant="subtitle1">{item?.title}</Typography>
                </div>
              </MenuItem>
            );
          }),
      },
      {
        type: "Select",
        label: "دسته بندی شغلی",
        name: "categoryId",
        validation: yup.string().required(FIELD_REQUIRED),
        options: jobCategories,
        grids: grids,
        grouped: true,
        renderMenuItem: (data) =>
          data?.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <div>
                  <Typography variant="subtitle1">{item?.title}</Typography>
                </div>
              </MenuItem>
            );
          }),
      },
    ],
    [jobCategories, jobContracts],
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

  const submitForm = useCallback(
    async (formValue) => {
      if (dialog.type === "new")
        dispatch(
          addAdvertisement({
            formValue,
            resetForm: () => formik?.resetForm(),
          }),
        );
      else
        dispatch(
          updateAdvertisement({
            id: dialog.data.id,
            formValue,
            resetForm: () => formik?.resetForm(),
          }),
        );
    },
    [dialog, formik],
  );

  const closeComposeDialog = () => {
    formik?.resetForm();
    return dialog.type === "edit"
      ? dispatch(closeEditDialog())
      : dispatch(closeNewDialog());
  };

  useEffect(() => {
    if (dialog.data) {
      const { data } = dialog;
      Object.keys(data).map((key) => {
        if (key !== "contract" && key !== "category") {
          formik?.setFieldValue(key, data[key]);
        }
      });
    }
    return () => {};
  }, [dialog, formik?.setFieldValue]);

  return (
    <WrapperDialog
      open={dialog.open}
      title={dialog.type === "new" ? "افزودن" : "ویرایش"}
      handleClose={closeComposeDialog}
      dialogActionsChildren={
        <div className="flex flex-grow justify-around items-center gap-8">
          <Button
            className="rounded-8"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => formik?.handleSubmit()}
          >
            ثبت
          </Button>
          <Button
            className="rounded-8"
            variant="contained"
            fullWidth
            onClick={() => closeComposeDialog()}
          >
            بستن
          </Button>
        </div>
      }
    >
      {form}
    </WrapperDialog>
  );
};

export default ExerciseDialog;
