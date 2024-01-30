import * as yup from "yup";
import { FIELD_REQUIRED } from "../../../../reusable/messages";
import { typeOnlyNumber } from "../../../../reusable/Form/FormikHook";

export const tableColumns = [
  {
    header: "عنوان",
    accessorKey: "title",
  },
  {
    header: "نام سازمان",
    accessorKey: "companyName",
  },
  {
    header: "نوع قرارداد",
    accessorKey: "contract.title",
  },
  {
    header: "دسته شغلی",
    accessorKey: "category.title",
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
  // { type: "Upload", label: "لوگو شرکت", name: "companyLogo", grids: grids },
  {
    type: "TextField",
    label: "نام سازمان",
    name: "companyName",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: grids,
  },
  {
    type: "TextField",
    label: "سایت",
    name: "companyWebsite",
    validation: yup.string().url(),
    grids: grids,
  },
  {
    type: "TextField",
    label: "تعداد کارمندان",
    name: "companySize",
    validation: yup.number().required(FIELD_REQUIRED),
    others: {
      onKeyDown: typeOnlyNumber,
    },
    grids: grids,
  },
  {
    type: "TextField",
    label: "حقوق",
    name: "salary",
    validation: yup.number().required(FIELD_REQUIRED),
    others: {
      // placeholder: "در صورت توافقی بودن خالی بگذارید",
      onKeyDown: typeOnlyNumber,
    },
    grids: grids,
  },
  {
    type: "TextField",
    label: "حداقل سابقه کار(سال)",
    name: "minWorkExperience",
    validation: yup.number().required(FIELD_REQUIRED),
    others: {
      onKeyDown: typeOnlyNumber,
    },
    grids: grids,
  },
  {
    type: "TextField",
    label: "موقعیت مکانی",
    name: "location",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: grids,
  },
  {
    type: "TextField",
    label: "شرح موقعیت شغلی",
    name: "jobDescription",
    validation: yup.string().required(FIELD_REQUIRED),
    others: {
      multiline: true,
      rows: 4,
    },
    grids: { xs: 12, sm: 12, md: 12, xl: 12 },
  },
  {
    type: "TextField",
    label: "شرح سازمان",
    name: "companyDescription",
    validation: yup.string().required(FIELD_REQUIRED),
    others: {
      multiline: true,
      rows: 4,
    },
    grids: { xs: 12, sm: 12, md: 12, xl: 12 },
  },
  {
    type: "Select",
    label: "به اشتراک گذاشته شود؟",
    name: "isShared",
    validation: yup.string().required(FIELD_REQUIRED),
    options: [
      { value: "بله", id: true },
      { value: "خیر", id: false },
    ],
    grids: { xs: 12, sm: 12, md: 12, xl: 12 },
  },
];
