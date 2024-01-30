import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Icon, IconButton, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { apiCaller } from "../../../../../reusable/axios";
import { Link, useNavigate } from "react-router-dom";

function SidebarContent({ advertisementId }) {
  const navigate = useNavigate();
  // @ts-ignore
  const user = useSelector((state) => state.user.data);
  const [value, setValue] = useState<any>();

  const checkResume = async () => {
    const res = await apiCaller(() => axios.get(`/users/resume`));
    setValue(res.data?.data);
  };

  useEffect(() => {
    checkResume();
  }, []);

  async function onChange(ev) {
    const files = ev.target.files;
    setValue(files[0]);
    const data = new FormData();
    data.append("file", files[0]);
    try {
      const res = await axios.post("/users/uploadResume", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("رزومه با موفقیت آپلود شد");
      checkResume();
    } catch (e) {
      toast.error(e.message);
    }
  }

  const remove = async (ev) => {
    ev.preventDefault();
    const res = await apiCaller(() =>
      axios.delete(`/users/removeResume/${value?.id}`),
    );
    setValue(undefined);
  };

  const sendResume = async () => {
    try {
      const res = await axios.post("/users/sendResume", { advertisementId });
      toast.success(res.data.message[0]);
      navigate("/apps/advertisements");
    } catch (e) {
      toast.error(e.response.data.message[0] ?? e.message);
    }
  };

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
        {value ? (
          <div className="flex flex-wrap items-center justify-between gap-8 border rounded cursor-pointer p-4">
            <Link to={value?.link} target="_blank">
              {value?.name}
            </Link>
            <IconButton onClick={remove}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </div>
        ) : (
          <label className="my-16 h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded p-2 text-2xl text-gray-600">
            <input
              type="file"
              className="hidden"
              onChange={onChange}
              accept=".pdf,.doc,.docx"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            آپلود رزومه
          </label>
        )}
        <div className="p-20">
          <Button
            variant="contained"
            color="secondary"
            className="rounded-8"
            onClick={() => sendResume()}
            disabled={!value}
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
