import React, { useEffect, useState } from "react";
import { useDeepCompareEffect, useThemeMediaQuery } from "@fuse/hooks";
import FusePageCarded from "@fuse/core/FusePageSimple";
import Header from "./header";
import Content from "./content";
import { apiCaller } from "../../../../../reusable/axios";
import axios from "axios";

const AdvertisementApp = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [list, setList] = useState();
  const getData = async () => {
    const res = await apiCaller(() => axios.get(`advertisements/list`));
    setList(res.data?.data);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <FusePageCarded
      header={<Header />}
      content={<Content data={list}/>}
      scroll={isMobile ? "normal" : "content"}
    />
  );
};

export default AdvertisementApp;
