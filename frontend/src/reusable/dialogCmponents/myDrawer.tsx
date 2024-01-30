import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    // @ts-ignore
    left: theme.spacing(1),
    // @ts-ignore
    top: theme.spacing(1),
    // @ts-ignore
    color: theme.palette.primary.light,
  },
}));
const WrapperDrawer = ({
  anchor,
  open,
  setOpen,
  children,
  title,
  ...rest
}: any) => {
  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor={anchor ?? "bottom"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      {...rest}
    >
      <div className="flex flex-col justify-start">
        <AppBar position="static" elevation={0} className="mb-8">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {title ?? ""}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </div>
    </SwipeableDrawer>
  );
};

export default WrapperDrawer;
