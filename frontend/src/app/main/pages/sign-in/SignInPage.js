import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import jwtService from "../../../auth/services/jwtService";
import Banner from "./banner";
import { useMemo, useState } from "react";
import FormikHook, {
  createFormikObjects,
  typeOnlyNumber,
} from "../../../../reusable/Form/FormikCustomHook";
import * as yup from "yup";
import { FIELD_REQUIRED } from "../../../../reusable/messages";
import { Icon, InputAdornment } from "@mui/material";
import Spinner from "../../../../reusable/spinner";

function SignInPage() {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const config = useMemo(
    () => [
      {
        type: "TextField",
        name: "email",
        label: "ایمیل",
        validation: yup.string().required(FIELD_REQUIRED),

        grids: { xs: 12, md: 12, sm: 12 },
      },
      {
        label: "رمز عبور",
        name: "password",
        type: "TextField",
        validation: yup.string().required(FIELD_REQUIRED),
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
        grids: { xs: 12, md: 12, sm: 12 },
      },
    ],
    [showPassword],
  );
  const { initialValues, validationSchema } = createFormikObjects(config);
  const [form, formik] = FormikHook(
    {
      inputData: config,
      initialValues,
      validationSchema,
    },
    (values) => submitForm(values),
  );

  const submitForm = ({ email, password }) => {
    setLoader(true);
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {})
      .catch((e) => {});
    setLoader(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            ورود
          </Typography>
          <div className="flex items-baseline mt-12 font-medium">
            <Typography>تاکنون ثبت ‌نام نکرده‌اید؟</Typography>
            <Link className="mx-4" to="/sign-up">
              ثبت نام
            </Link>
          </div>
          <div className="flex items-baseline mt-12 font-medium">
            <Link className="mx-4" to="/apps/advertisementList">
              مشاهده لیست آگهی ها
            </Link>
          </div>
          <div className="flex flex-col justify-center w-full mt-16">
            {form}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between my-8 mt-16 space-y-4">
              <Link className="text-md font-semibold" to="/forgot-password">
                فراموشی رمز عبور؟
              </Link>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-16 rounded-8"
              aria-label="Sign in"
              size="large"
              onClick={() => formik?.handleSubmit()}
            >
              {loader ? <Spinner className="mx-4" /> : null}
              ورود
            </Button>
          </div>
        </div>
      </Paper>
      <Banner />
    </div>
  );
}

export default SignInPage;
