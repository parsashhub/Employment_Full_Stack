import React from "react";
import FusePageCarded from "@fuse/core/FusePageSimple";
import {useDeepCompareEffect, useThemeMediaQuery} from "@fuse/hooks";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const AdvertisementDetailApp = () => {
  const routeParams = useParams();
  const { id } = routeParams;
  console.log(id);
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useDeepCompareEffect(() => {}, [dispatch]);

  return (
    <FusePageCarded
      header={<div>this is header</div>}
      content={<div>this is content {id} </div>}
      scroll={isMobile ? "normal" : "content"}
    />
  );
};

export default AdvertisementDetailApp;
