import Tooltip from "@mui/material/Tooltip";
import { Icon, IconButton } from "@mui/material";
import {
  openEditDialog,
  removeAdvertisement,
} from "../advertisement/store/slice";
import React from "react";

export const tableColumns = [
  {
    Header: "عنوان",
    accessor: "advertisement.title",
  },
  {
    Header: "نام سازمان",
    accessor: "advertisement.companyName",
  },
  {
    Header: "نوع قرارداد",
    accessor: "advertisement.contract.title",
  },
  {
    Header: "دسته شغلی",
    accessor: "advertisement.category.title",
  },
  {
    Header: "وضعیت",
    id: "action",
    sortable: false,
    Cell: ({ row }) => {
      const { status } = row.original;
      switch (status) {
        case "NOT_SEEN":
          return <span>بررسی نشده</span>;
        case "REJECTED":
          return <span>رد شده</span>;
        case "ACCEPTED":
          return <span>تایید برای مصاحبه</span>;
      }
    },
  },
];
const grids = { xs: 12, sm: 6, md: 6, xl: 4 };
