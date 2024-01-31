import React, { useEffect, useState } from "react";
import { useThemeMediaQuery } from "@fuse/hooks";
import FusePageCarded from "@fuse/core/FusePageSimple";
import Header from "./header";
import Content from "./content";
import axios from "axios";
import { apiCaller } from "../../../../reusable/axios";

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
      header={<Header setList={setList} />}
      content={<Content data={list} setList={setList} />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
};

export default AdvertisementApp;
