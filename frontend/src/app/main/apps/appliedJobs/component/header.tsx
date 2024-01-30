import React from "react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

const ExerciseHeader = () => {
  return (
    <div className="flex flex-col md:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-20 px-24 md:px-32">
      <div className="flex items-center">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          className="flex text-24 md:text-28 font-bold tracking-tight"
        >
          درخواست های من
        </Typography>
      </div>
    </div>
  );
};

export default ExerciseHeader;
