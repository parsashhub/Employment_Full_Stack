import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import { Button, Icon, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

function SidebarContent(props) {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4 ">
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 lg:rounded-16 lg:shadow"
        elevation={5}
      >
        <div className="p-24 flex items-center">
          <Avatar />
          <Typography className="mx-12">
            {user.firstname + " " + user.lastname}
          </Typography>
        </div>
        <Divider />
        <div className="p-20">
          <Button
            variant="contained"
            color="secondary"
            className="rounded-8"
            fullWidth
          >
            ارسال رزومه
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default SidebarContent;
