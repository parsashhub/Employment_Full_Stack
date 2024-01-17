import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardActions,
  CardContent,
  Icon,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { sort: "title_1", label: "صعودی عنوان آگهی" },
  { sort: "title_0", label: "نزولی عنوان آگهی" },
  { sort: "salary_1", label: "بیشترین حقوق" },
  { sort: "createdAt_0", label: "جدید ترین آگهی ها" },
];
const Content = ({ data }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [expanded, setExpanded] = useState(false);

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
          <AccordionDetails>
            <Typography>{/*  form goes here */}</Typography>
          </AccordionDetails>
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
