import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthRouteProvider";

function SignOutPage() {
  const { jwtService } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      jwtService.signOut();
    }, 1000);
  }, []);

  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
      <Paper className="flex min-h-full w-full items-center rounded-0 px-16 py-32 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
        <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
          <img
            className="mx-auto w-48"
            src="assets/images/logo/logo.svg"
            alt="logo"
          />
          <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight text-center">
            شما از سیستم خارج شده اید!
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default SignOutPage;
