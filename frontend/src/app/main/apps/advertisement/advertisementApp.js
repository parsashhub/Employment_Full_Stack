import React from "react";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import FusePageCarded from "@fuse/core/FusePageSimple";
import { useDeepCompareEffect } from "@fuse/hooks";
import Content from "./component/content";
import Header from "./component/header";
import withReducer from "app/store/withReducer";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { getAdvertisements } from "./store/slice";
import { getJobCategories, getJobContracts } from "app/store/utilsSlice";

const AdvertisementApp = () => {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useDeepCompareEffect(() => {
    dispatch(getAdvertisements({}));
    dispatch(getJobContracts({}));
    dispatch(getJobCategories({}));
  }, [dispatch]);

  return (
    <FusePageCarded
      header={<Header />}
      content={<Content />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
};

export default withReducer("advertisement", reducer)(AdvertisementApp);
