import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import * as yup from "yup";
import { Box, Button, Step, StepButton, Stepper } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { FIELD_REQUIRED } from "../../../reusable/messages";
import FormikHook, {
  createFormikObjects,
  typeOnlyNumber,
} from "../../../reusable/Form/FormikHook";
import Timer from "../../../reusable/timer";

const steps = ["دریافت کد", "احراز هویت"];

function OtpSigninPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState("");

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const config = useMemo(
    () => [
      {
        type: "PatternTextField",
        name: "phoneNumber",
        label: "شماره همراه",
        format: "09## ### ####",
        placeholder: "شماره خود را بدون 09 آن وارد کنید",
        validation: yup.string().required(FIELD_REQUIRED),
        others: {
          onKeyDown: typeOnlyNumber,
          className: "text-center",
        },
        grids: { xs: 12, md: 12, sm: 12 },
      },
    ],
    [],
  );
  const { initialValues, validationSchema } = createFormikObjects(config);
  const [form, formik] = FormikHook(
    {
      inputData: config,
      initialValues,
      validationSchema,
    },
    (values) => {
      console.log(values);
      setActiveStep(1);
    },
  );

  const handleComplete = (value) => {
    console.log(value);
  };

  const [disable, setDisable] = useState(true);
  const [reset, setReset] = useState(false);
  const resendCode = useCallback(async () => {
    try {
      // const response = await axios.post(
      //     "api/stateWayBill/otpForPayment",
      //     qs.stringify({ wayBillId: arr })
      // );
      // toast.success(response?.data?.message);
      setReset(true);
      setDisable(true);
    } catch (e) {
      // toast.404(e.response?.data?.message);
    }
  }, []);

  const onTimerFinished = () => {
    setDisable(false);
    setReset(false);
  };

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-8 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            ورود با رمز یکبار مصرف
          </Typography>
          <div className="flex items-baseline my-12 font-medium">
            <Typography>می خواهید با رمز عبور وارد شوید؟</Typography>
            <Link className="mx-4" to="/sign-in">
              ورود
            </Link>
          </div>
          <Box className="w-full my-32">
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepButton color="inherit">{label}</StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep === 0 && (
            <>
              {form}
              <Button
                className="rounded-8 mb-44 mt-24"
                variant="contained"
                color="secondary"
                onClick={() => formik?.handleSubmit()}
                size="large"
                fullWidth
              >
                دریافت کد تایید
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <>
              <MuiOtpInput
                style={{ direction: "ltr" }}
                length={5}
                value={otp}
                onComplete={handleComplete}
                onChange={(e) => setOtp(e)}
              />
              <Timer
                isReversed={true}
                onFinish={onTimerFinished}
                totalCount={180}
                onReset={reset}
              />
              <Button
                className="rounded-8 my-24"
                variant="contained"
                color="secondary"
                onClick={() => setActiveStep(2)}
                size="large"
                fullWidth
              >
                ارسال کد
              </Button>
              <Button
                className="rounded-8 mb-44"
                variant="contained"
                disabled={disable}
                onClick={resendCode}
                fullWidth
              >
                ارسال مجدد
              </Button>
            </>
          )}
        </div>
      </Paper>
    </div>
  );
}

const defaultValues = {
  email: "",
};

export default OtpSigninPage;
