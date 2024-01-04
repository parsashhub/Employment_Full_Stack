import { useEffect } from "react";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import settingsConfig from "app/configs/settingsConfig";
import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hideLoader, showLoader } from "app/store/loaderSlice";
import { initInterceptors } from "../reusable/axios";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

function App() {
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);
  const loaderColor = mainTheme.palette.secondary.main;
  const isLoading = useSelector(({ loader }) => loader.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    initInterceptors(
      () => dispatch(showLoader()),
      () => dispatch(hideLoader())
    );
  }, []);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <ToastContainer
          style={{ top: "8rem" }}
          hideProgressBar={false}
          position="top-left"
          autoClose={3000}
          limit={2}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          rtl
        />
        <div
          style={{ zIndex: 9999 }}
          className={`w-screen h-screen bg-slate-700 fixed opacity-50 blur ${
            isLoading ? "visible" : "invisible"
          }`}
        />
        <ThreeDots
          wrapperStyle={{ zIndex: 9999 }}
          wrapperClass="fixed top-1/3 right-1/2"
          height="120"
          width="120"
          radius="9"
          color={loaderColor}
          ariaLabel="three-dots-loading"
          visible={isLoading}
        />
        <AuthProvider>
          <BrowserRouter>
            <FuseAuthorization
              userRole={user.role}
              loginRedirectUrl={settingsConfig.loginRedirectUrl}
            >
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                classes={{
                  containerRoot:
                    "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                }}
              >
                <FuseLayout layouts={themeLayouts} />
              </SnackbarProvider>
            </FuseAuthorization>
          </BrowserRouter>
        </AuthProvider>
      </FuseTheme>
    </CacheProvider>
  );
}

export default withAppProviders(App)();
