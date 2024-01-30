import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export const tableColumns = [
  {
    header: "عنوان",
    accessorKey: "advertisement.title",
  },
  {
    header: "نام سازمان",
    accessorKey: "advertisement.companyName",
  },
  {
    header: "نوع قرارداد",
    accessorKey: "advertisement.contract.title",
  },
  {
    header: "دسته شغلی",
    accessorKey: "advertisement.category.title",
  },
  {
    header: "وضعیت",
    id: "action",
    cell: ({ row }) => {
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
    header: "عنوان آگهی",
    cell: ({ row }) => {
      const { advertisement } = row.original;
      return (
        <Link to={`/apps/advertisements/${advertisement.id}`}>
          {advertisement.title}
        </Link>
      );
    },
  },
  {
    header: "نوع قرارداد",
    accessorKey: "advertisement.contract.title",
  },
  {
    header: "دسته شغلی",
    accessorKey: "advertisement.category.title",
  },
  {
    header: "نام و نام خانوادگی",
    cell: ({ row }) => {
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
    header: "وضعیت",
    cell: ({ row }) => {
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
