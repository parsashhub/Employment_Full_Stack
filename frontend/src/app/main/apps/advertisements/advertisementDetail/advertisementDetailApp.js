import React, { useEffect, useRef, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageSimple";
import { useThemeMediaQuery } from "@fuse/hooks";
import { useParams } from "react-router-dom";
import { apiCaller } from "../../../../../reusable/axios";
import axios from "axios";
import SidebarContent from "./sidebar";
import Content from "./content";
import { useSelector } from "react-redux";

const AdvertisementDetailApp = () => {
  const { id } = useParams();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
  const [data, setData] = useState();
  const user = useSelector((state) => state.user.data);
  const getData = async () => {
    const res = await apiCaller(() => axios.get(`advertisements/${id}`));
    setData(res.data?.data);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <FusePageCarded
      content={<Content data={data} />}
      scroll={isMobile ? "normal" : "content"}
      rightSidebarContent={
        user.role === "JOBSEEKER" ? (
          <SidebarContent advertisementId={data?.id} />
        ) : null
      }
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarWidth={288}
      sidebarInner
      innerScroll
    />
  );
};

export default AdvertisementDetailApp;
