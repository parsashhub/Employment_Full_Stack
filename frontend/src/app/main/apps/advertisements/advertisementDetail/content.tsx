import { motion } from "framer-motion";
import React from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const gridProps = {
  item: true,
  xs: 12,
  md: 4,
  lg: 4,
  xl: 4,
};

const Content = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      className="w-full flex flex-col min-h-full flex-wrap p-8 gap-8"
    >
      <div className="text-2xl">{data?.title}</div>
      <div className="flex items-center justify-between">
        <div>
          <span>نام سازمان:</span> {data?.companyName}
        </div>
        <div>
          {data?.companySize} <span>نفر</span>
        </div>
        <div>
          <span>وبسایت:</span> {data?.companyWebsite}
        </div>
      </div>
      <Divider />
      <Grid container justifyContent="start" alignItems="center" spacing={2}>
        <Grid {...gridProps} className="flex flex-col gap-y-4">
          <Chip variant="outlined" label="دسته بندی شغلی" className="rounded" />
          <Chip label={data?.category.title} className="rounded" />
        </Grid>
        <Grid className="flex flex-col gap-y-4" {...gridProps}>
          <Chip variant="outlined" label="موقعیت مکانی" className="rounded" />
          <Chip label={data?.location} className="rounded" />
        </Grid>
        <Grid {...gridProps} className="flex flex-col gap-y-4">
          <Chip variant="outlined" label="نوع همکاری" className="rounded" />
          <Chip label={data?.contract.title} className="rounded" />
        </Grid>
        <Grid {...gridProps} className="flex flex-col gap-y-4">
          <Chip
            variant="outlined"
            label="حداقل سابقه کار"
            className="rounded"
          />
          <Chip label={data?.minWorkExperience} className="rounded" />
        </Grid>
        <Grid {...gridProps} className="flex flex-col gap-y-4">
          <Chip variant="outlined" label="حقوق" className="rounded" />
          <Chip label={data?.salary} className="rounded" />
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h6">شرح موقعیت شغلی</Typography>
      <Typography variant="body1">{data?.jobDescription}</Typography>
      <Typography variant="h6">معرفی شرکت</Typography>
      <Typography variant="body1">{data?.companyDescription}</Typography>
    </motion.div>
  );
};

export default Content;
