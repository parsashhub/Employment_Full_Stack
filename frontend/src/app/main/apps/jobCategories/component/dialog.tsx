import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobCategory,
  closeEditDialog,
  closeNewDialog,
  selectData,
  updateJobCategory,
} from "../store/slice.js";
import { Button } from "@mui/material";
import { dialogForm } from "../array.js";
import FormikHook, {
  createFormikObjects,
} from "../../../../../reusable/Form/FormikHook";
import WrapperDialog from "../../../../../reusable/dialogCmponents/myDialog";

const Dialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(selectData("dialog"));

  const formData = useMemo(() => [...dialogForm], []);
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
      if (dialog.type === "new") {
        dispatch(
          // @ts-ignore
          addJobCategory({
            formValue,
            resetForm: () => formik?.resetForm(),
          }),
        );
      } else
        dispatch(
          // @ts-ignore
          updateJobCategory({
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
    return dialog?.type === "edit"
      ? // @ts-ignore
        dispatch(closeEditDialog())
      : // @ts-ignore
        dispatch(closeNewDialog());
  };

  useEffect(() => {
    if (dialog?.data) {
      const { data } = dialog;
      formik?.setFieldValue("title", data?.title);
    }
    return () => {};
  }, [dialog, formik?.setFieldValue]);

  return (
    <WrapperDialog
      maxWidth={"sm"}
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
