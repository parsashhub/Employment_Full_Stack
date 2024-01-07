import { motion } from "framer-motion";
import React, { Fragment, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Icon,
  IconButton,
  ListItemButton,
  Paper,
} from "@mui/material";
import EnhancedTable from "../../../../../reusable/Table";
import DeleteDialog from "../../../../../reusable/Dialogs/deleteDialog";
import {
  getJobCategories,
  openEditDialog,
  openNewDialog,
  removeJobCategory,
  selectData,
  selectJobCategories,
} from "../store/slice";
import Dialog from "./dialog";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { selectUser } from "app/store/userSlice";
import Tooltip from "@mui/material/Tooltip";
import { tableColumns } from "../array";
import useThemeMediaQuery from "../../../../../@fuse/hooks/useThemeMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import WrapperDrawer from "../../../../../reusable/Dialogs/myDrawer";

const ExerciseContent = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectUser);
  const data = useSelector(selectJobCategories);
  const sortOptions = useSelector(selectData("sortOptions"));
  const sort = useSelector(selectData("sort"));
  const meta = useSelector(selectData("meta"));
  const links = useSelector(selectData("links"));
  const page = useSelector(selectData("page"));

  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [handleDelete, setHandleDelete] = useState(() => () => {});
  const [expanded, setExpanded] = useState(false);

  const columns = useMemo(
    () => [
      ...tableColumns,
      {
        Header: "عملیات",
        id: "action",
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <Tooltip title="ویرایش">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(openEditDialog(row.original));
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                  setHandleDelete(() => async () => {
                    setOpen(false);
                    await Promise.all([
                      dispatch(removeJobCategory(row.original.id)),
                    ]);
                  });
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    [dispatch, setHandleDelete, setOpen, user],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      className="w-full flex flex-col min-h-full"
    >
      <Paper className="flex flex-col" elevation={5}>
        {!isMobile && (
          <>
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
                    onClick={() => dispatch(getJobCategories({ sort }))}
                    className="p-8 cursor-pointer rounded-8"
                  >
                    {label}
                  </Paper>
                );
              })}
            </div>
            <div className="flex items-center gap-8 px-16 my-16">
              <Button
                className="rounded-lg"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(openNewDialog())}
              >
                <Icon className="ml-6">add</Icon>
                افزودن
              </Button>
            </div>
          </>
        )}
        {isMobile && (
          <div className="flex items-center gap-8 p-16">
            <>
              <Button
                className="rounded-lg"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(openNewDialog())}
              >
                <Icon className="ml-6">add</Icon>
                افزودن
              </Button>
              <Button
                className="rounded-lg"
                variant="contained"
                onClick={() => setOpenD(true)}
              >
                <Icon className="ml-6">sort</Icon>
                مرتب سازی
              </Button>
              <Button className="rounded-lg" variant="contained">
                <Icon className="ml-6">filter_alt</Icon>
                فیلتر
              </Button>
            </>
          </div>
        )}
        <EnhancedTable
          data={data ?? []}
          columns={columns}
          onRowClick={() => {}}
          actions={{
            sort,
            page,
            meta,
            links,
            setPageConfig: (config) => {
              dispatch(getJobCategories(config));
            },
          }}
        />
      </Paper>
      <DeleteDialog open={open} setOpen={setOpen} handleDelete={handleDelete} />
      <Dialog />
      <WrapperDrawer
        title="مرتب سازی"
        open={openD}
        setOpen={setOpenD}
        children={
          <Box role="presentation">
            <List>
              {sortOptions?.map(({ sort, label }, index) => (
                <Fragment key={sort}>
                  {index === 0 ? null : <Divider />}
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        dispatch(getJobCategories({ sort }));
                        setOpenD(false);
                      }}
                    >
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Box>
        }
      />
    </motion.div>
  );
};

export default ExerciseContent;
