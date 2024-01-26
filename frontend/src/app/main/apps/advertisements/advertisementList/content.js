import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardActions,
  CardContent,
  Icon,
  MenuItem,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FIELD_REQUIRED } from "../../../../../reusable/messages";
import utils, { getJobCategories, getJobContracts } from "app/store/utilsSlice";
import FormikHook, {
  createFormikObjects,
} from "../../../../../reusable/Form/FormikCustomHook";
import { apiCaller } from "../../../../../reusable/axios";
import axios from "axios";

const sortOptions = [
  { sort: "title_1", label: "صعودی عنوان آگهی" },
  { sort: "title_0", label: "نزولی عنوان آگهی" },
  { sort: "salary_1", label: "بیشترین حقوق" },
  { sort: "createdAt_0", label: "جدید ترین آگهی ها" },
];
const Content = ({ data, setList }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { jobCategories, jobContracts } = useSelector(({ utils }) => utils);

  useEffect(() => {
    if (jobContracts.length === 0) dispatch(getJobContracts({}));
    if (jobCategories.length === 0) dispatch(getJobCategories({}));
  }, [jobContracts, jobCategories]);

  const filters = useMemo(
    () => [
      {
        type: "Select",
        label: "قرارداد",
        name: "contractId",
        validation: yup.string(),
        options: jobContracts,
        grouped: true,
        renderMenuItem: (data) =>
          data?.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <div>
                  <Typography variant="subtitle1">{item?.title}</Typography>
                </div>
              </MenuItem>
            );
          }),
        grids: { xs: 12, sm: 12, md: 4, xl: 3 },
      },
      {
        type: "Select",
        label: "دسته بندی شغلی",
        name: "categoryId",
        validation: yup.string(),
        options: jobCategories,
        grouped: true,
        renderMenuItem: (data) =>
          data?.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <div>
                  <Typography variant="subtitle1">{item?.title}</Typography>
                </div>
              </MenuItem>
            );
          }),
        grids: { xs: 12, sm: 12, md: 4, xl: 3 },
      },
      {
        type: "Custom",
        name: "btn1",
        component: (
          <Button
            variant="contained"
            color="secondary"
            className="w-full mt-16 rounded-8"
            aria-label="Sign in"
            size="large"
            onClick={() => formik?.handleSubmit()}
          >
            اعمال فیلتر
          </Button>
        ),
        grids: { xs: 12, md: 2, sm: 12, xl: 3 },
      },
      {
        type: "Custom",
        name: "btn2",
        component: (
          <Button
            variant="contained"
            color="error"
            className="w-full mt-16 rounded-8"
            aria-label="Sign in"
            size="large"
            onClick={() => {
              formik?.resetForm();
              formik?.handleSubmit();
            }}
          >
            حذف فیلتر
          </Button>
        ),
        grids: { xs: 12, md: 2, sm: 12, xl: 3 },
      },
    ],
    [jobContracts, jobCategories],
  );

  const { initialValues, validationSchema } = createFormikObjects(filters);
  const [form, formik] = FormikHook(
    {
      inputData: filters,
      initialValues,
      validationSchema,
    },
    async (formValue) => {
      let filters = "";
      for (let key in formValue) {
        if (formValue[key] !== "" && formValue[key] !== undefined) {
          filters += `&${key}=${formValue[key]}`;
        }
      }
      const res = await apiCaller(() =>
        axios.get(`advertisements/list?page=1${filters}`),
      );
      setList(res.data?.data);
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      className="w-full flex flex-col min-h-full"
    >
      <Paper className="flex flex-col" elevation={5}>
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded((pre) => !pre)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>فیلتر ها</Typography>
          </AccordionSummary>
          <AccordionDetails>{form}</AccordionDetails>
        </Accordion>
        <div className="flex flex-wrap items-center justify-start gap-8 mt-16 px-16">
          <Icon>sort</Icon>
          <Paper elevation={0} className="rounded-8">
            مرتب سازی
          </Paper>
          {sortOptions?.map(({ sort, label }) => {
            return (
              <Paper
                elevation={10}
                key={sort}
                onClick={() => {}}
                className="p-8 cursor-pointer rounded-8"
              >
                {label}
              </Paper>
            );
          })}
        </div>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className="w-full py-16 gap-y-8"
        >
          {data?.map((item) => (
            <Grid
              key={item.id}
              item
              xs={12}
              md={4}
              lg={4}
              xl={3}
              className="flex items-center justify-center"
            >
              <Card
                sx={{
                  maxWidth: 300,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                elevation={10}
              >
                <CardContent className="flex flex-col gap-y-8">
                  <div className="flex justify-center">
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    <span>نام سازمان:</span>
                    {item.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>دسته بندی شغلی:</span> {item?.category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>مکان:</span> {item?.location}
                  </Typography>
                  <div className="flex flex-wrap justify-between">
                    <Typography variant="body2" color="text.secondary">
                      <span>قرارداد</span> {item?.contract.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.salary}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions className="flex flex-warp justify-center items-center">
                  <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    className="rounded-8"
                    onClick={() =>
                      navigate(
                        _.isEmpty(user)
                          ? "/sign-in"
                          : `/apps/advertisements/${item.id}`,
                      )
                    }
                  >
                    {_.isEmpty(user) ? "وارد شوید" : "ارسال رزومه"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default Content;
