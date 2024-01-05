import React from "react";
import { useDeepCompareEffect, useThemeMediaQuery } from "@fuse/hooks";
import FusePageCarded from "@fuse/core/FusePageSimple";
import { useDispatch } from "react-redux";

const AdvertisementApp = () => {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useDeepCompareEffect(() => {}, [dispatch]);

  return (
    <FusePageCarded
      header={<div>this is header</div>}
      content={<div>this is content</div>}
      scroll={isMobile ? "normal" : "content"}
    />
  );
};

export default AdvertisementApp;
