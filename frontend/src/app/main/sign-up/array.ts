import * as yup from "yup";
import {FIELD_REQUIRED} from "../../../reusable/messages";
import {typeOnlyNumber} from "../../../reusable/Form/FormikHook";


export const formData = [
  {
    label: "نام",
    name: "firstname",
    type: "TextField",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
  {
    label: "نام خانوادگی",
    name: "lastname",
    type: "TextField",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
  {
    label: "ایمیل",
    name: "email",
    type: "TextField",
    validation: yup.string().email().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
];

export const formDataOrg = [
  {
    label: "نام",
    name: "firstname",
    type: "TextField",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
  {
    label: "نام خانوادگی",
    name: "lastname",
    type: "TextField",
    validation: yup.string().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
  {
    label: "ایمیل",
    name: "email",
    type: "TextField",
    validation: yup.string().email().required(FIELD_REQUIRED),
    grids: { xs: 12, sm: 12, md: 12 },
  },
  {
    type: "PatternTextField",
    name: "phoneNumber",
    label: "شماره همراه",
    format: "09## ### ####",
    placeholder: "شماره خود را بدون 09 اول آن وارد کنید",
    validation: yup.string().required(FIELD_REQUIRED),
    others: {
      onKeyDown: typeOnlyNumber,
    },
    grids: { xs: 12, md: 12, sm: 12 },
  },
];
