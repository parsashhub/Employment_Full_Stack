import * as yup from "yup";
import { FIELD_REQUIRED } from "../../../../reusable/messages";

export const tableColumns = [
  {
    header: "عنوان",
    accessorKey: "title",
  },
];
const grids = { xs: 12, sm: 6, md: 6, xl: 4 };

export const dialogForm = [
  {
    type: "TextField",
    label: "عنوان",
    name: "title",
    init: "",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: grids,
  },
];
