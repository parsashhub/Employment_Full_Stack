import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { FIELD_REQUIRED } from "../../../../../reusable/messages";

const defaultValues = { subject: "", message: "" };
const schema = yup.object().shape({
  subject: yup.string().required(FIELD_REQUIRED),
  message: yup.string().required(FIELD_REQUIRED),
});

function HelpCenterSupport() {
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function onSubmit(data) {
    console.log(data);
  }

  if (_.isEmpty(form)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          تماس با پشتیبانی
        </div>

        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography className="text-2xl font-bold tracking-tight">
                درخواست خود را ارسال کنید{" "}
              </Typography>
              <Typography color="text.secondary">
                درخواست شما بررسی خواهد شد و کارکنان پشتیبانی ما در حداکثر 24
                ساعت به شما پاسخ می دهند.
              </Typography>
            </div>
            <div className="space-y-32">
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="موضوع"
                    placeholder="Subject"
                    variant="outlined"
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    required
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="پیام"
                    className="mt-16 w-full"
                    margin="normal"
                    multiline
                    minRows={4}
                    variant="outlined"
                    error={!!errors.message}
                    helperText={errors?.message?.message}
                    required
                  />
                )}
              />
            </div>
          </form>
          <div className="flex items-center justify-end mt-32">
            <Button
              className="mx-8 rounded-8"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmit(onSubmit)}
              fullWidth
            >
              ثبت
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default HelpCenterSupport;
