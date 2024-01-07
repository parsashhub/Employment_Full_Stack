import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobCategory,
  closeEditDialog,
  closeNewDialog,
  selectData,
  updateJobCategory,
} from "../store/slice";
import WrapperDialog from "../../../../../reusable/Dialogs/myDialog";
import FormikHook, {
  createFormikObjects,
} from "../../../../../reusable/Form/FormikCustomHook";
import { Button } from "@mui/material";
import { selectUtilsData } from "app/store/utilsSlice";
import { dialogForm } from "../array";

const grids = { xs: 12, sm: 6, md: 6, xl: 4 };

const ExerciseDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectData("dialog"));
  const jobContracts = useSelector(selectUtilsData("jobContracts"));
  const jobCategories = useSelector(selectUtilsData("jobCategories"));

  const formData = useMemo(
    () => [...dialogForm],
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
          addJobCategory({
            formValue,
            resetForm: () => formik?.resetForm(),
          }),
        );
      else
        dispatch(
          updateJobCategory({
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
      formik?.setFieldValue("title", data?.title);
    }
    return () => {};
  }, [dialog, formik?.setFieldValue]);

  return (
    <WrapperDialog
      maxWidth={"sm"}
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
