import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache, { Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import withAppProviders from "./withAppProviders";
import { AuthRouteProvider } from "./auth/AuthRouteProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { initInterceptors } from "../reusable/axios";
import { ThreeDots } from "react-loader-spinner";
import { hideLoader, showLoader } from "app/store/loaderSlice";

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
  const dispatch = useDispatch();
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);
  const isLoading = useSelector(({ loader }) => loader.isLoading);
  const loaderColor = mainTheme.palette.secondary.main;

  useEffect(() => {
    initInterceptors(
      () => dispatch(showLoader()),
      () => dispatch(hideLoader()),
    );
  }, []);

  return (
      <CacheProvider
        value={createCache(emotionCacheOptions[langDirection] as Options)}
      >
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <div
            style={{ zIndex: 9999 }}
            className={`w-screen h-screen bg-slate-700 fixed opacity-50 blur ${
              isLoading ? "visible" : "invisible"
            }`}
          />
          <ThreeDots
            // @ts-ignore
            wrapperStyle={{ zIndex: 9999 }}
            wrapperClass="fixed top-1/3 right-1/2"
            height="120"
            width="120"
            radius="9"
            color={loaderColor}
            ariaLabel="three-dots-loading"
            visible={isLoading}
          />
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
          <AuthRouteProvider>
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
          </AuthRouteProvider>
        </FuseTheme>
      </CacheProvider>
  );
}

export default withAppProviders(App);
