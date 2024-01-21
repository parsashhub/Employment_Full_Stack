import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

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

export const employerColumns = [
  {
    Header: "عنوان آگهی",
    Cell: ({ row }) => {
      const { advertisement } = row.original;
      return (
        <Link to={`/apps/advertisements/${advertisement.id}`}>
          {advertisement.title}
        </Link>
      );
    },
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
    Header: "نام و نام خانوادگی",
    Cell: ({ row }) => {
      const { user } = row.original;
      return (
        <Tooltip title={"برای مشاهده رزومه کلیک کنید"}>
          <Link
            to={`http://localhost:3001/api/resume/${user.Resume[0]?.data}`}
            target="_blank"
          >
            {`${user.firstname} ${user.lastname}`}
          </Link>
        </Tooltip>
      );
    },
  },
  {
    Header: "وضعیت",
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
