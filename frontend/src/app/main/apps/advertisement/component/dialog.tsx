import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdvertisement,
  closeEditDialog,
  closeNewDialog,
  selectData,
  updateAdvertisement,
} from "../store/slice.js";
import * as yup from "yup";
import { FIELD_REQUIRED } from "../../../../../reusable/messages";
import { Button, MenuItem, Typography } from "@mui/material";
import { dialogForm } from "../array.js";
import {
  useGetJobCategoriesQuery,
  useGetJobContractsQuery,
} from "app/store/utils";
import FormikHook, {
  createFormikObjects,
} from "../../../../../reusable/Form/FormikHook";
import WrapperDialog from "../../../../../reusable/dialogCmponents/myDialog";

const grids = { xs: 12, sm: 6, md: 6, xl: 4 };

const Dialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectData("dialog"));

  const { data: jobCategories } = useGetJobCategoriesQuery({
    pollingInterval: 600000,
    refetchOnMountOrArgChange: 600, // 10 min => 60 * 10
  });
  const { data: jobContracts } = useGetJobContractsQuery({
    pollingInterval: 600000,
    refetchOnMountOrArgChange: 600,
  });

  const formData = useMemo(
    () => [
      ...dialogForm,
      {
        type: "Select",
        label: "نوع قرارداد",
        name: "contractId",
        validation: yup.string().required(FIELD_REQUIRED),
        options: jobContracts?.data ?? [],
        grids: grids,
        grouped: true,
        renderMenuItem: (data: any[]) =>
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
        options: jobCategories?.data ?? [],
        grids: grids,
        grouped: true,
        renderMenuItem: (data: any[]) =>
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
      formValue.companySize = parseInt(formValue.companySize);
      formValue.minWorkExperience = parseInt(formValue.minWorkExperience);
      formValue.salary = parseInt(formValue.salary);
      if (dialog.type === "new") {
        dispatch(
          // @ts-ignore
          addAdvertisement({
            formValue,
            resetForm: () => formik?.resetForm(),
          }),
        );
      } else
        dispatch(
          // @ts-ignore
          updateAdvertisement({
            id: dialog?.data.id,
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
      ? // @ts-ignore
        dispatch(closeEditDialog())
      : // @ts-ignore
        dispatch(closeNewDialog());
  };

  useEffect(() => {
    if (dialog?.data) {
      const { data } = dialog;
      Object.keys(data).map((key) => {
        if (
          key !== "contract" &&
          key !== "category" &&
          key !== "updatedAt" &&
          key !== "createdAt" &&
          key !== "userId" &&
          key !== "id"
        ) {
          formik?.setFieldValue(key, data[key] ?? "");
        }
      });
    }
    return () => {};
  }, [dialog, formik?.setFieldValue]);

  return (
    <WrapperDialog
      open={dialog?.open ?? false}
      title={dialog?.type === "new" ? "افزودن" : "ویرایش"}
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

export default Dialog;
