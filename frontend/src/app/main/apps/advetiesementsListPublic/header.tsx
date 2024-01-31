import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Button, Icon, IconButton, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Input from "@mui/material/Input";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { selectMainTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import { apiCaller } from "../../../../reusable/axios";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setList }) => {
  const mainTheme = useSelector(selectMainTheme);
  const [value, setValue] = useState("");
  const [debounced] = useDebounce(value, 500);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await apiCaller(() =>
      axios.get(`advertisements/list?search=${debounced}`),
    );
    setList(res.data?.data);
  };

  useEffect(() => {
    if (debounced) getData();
  }, [debounced]);

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-20 px-24 md:px-32">
      <div className="flex items-center">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          className="flex text-24 md:text-28 font-bold tracking-tight"
        >
          لیست آگهی و پروژه ها
        </Typography>
      </div>
      <div className="flex flex-1 items-center justify-center px-8 sm:px-12 w-full md:w-1/2 my-8">
        <ThemeProvider theme={mainTheme}>
          <Paper
            style={{ alignSelf: "center" }}
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center w-full h-48 px-16 py-4 shadow md:w-1/2"
          >
            <Icon color="action">search</Icon>
            <Input
              className="flex flex-1 px-16"
              disableUnderline
              fullWidth
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <IconButton
              onClick={() => {
                setValue("");
                getData();
              }}
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </Paper>
        </ThemeProvider>
      </div>
      <div className="flex items-center">
        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-16 rounded-8 mb-12"
          onClick={() => navigate("/sign-in")}
        >
          ورود / ثبت نام
        </Button>
      </div>
    </div>
  );
};

export default Header;
