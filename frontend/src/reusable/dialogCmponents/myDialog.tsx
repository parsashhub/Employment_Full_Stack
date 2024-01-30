import React from "react";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useThemeMediaQuery from "../../@fuse/hooks/useThemeMediaQuery";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    // @ts-ignore
    left: theme.spacing(1),
    // @ts-ignore
    top: theme.spacing(1),
    color: "white",
  },
}));

const WrapperDialog = ({
  open,
  title,
  children,
  handleClose,
  defaultCloseBtn,
  dialogActionsChildren,
  ...rest
}: any) => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      maxWidth="md"
      keepMounted
      fullWidth
      fullScreen={isMobile}
      onClose={handleClose}
      {...rest}
    >
      <AppBar position="static" elevation={0} className="mb-8">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {title ?? ""}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent className="my-8">{children}</DialogContent>
      <DialogActions className="my-8 justify-center">
        {defaultCloseBtn ? (
          <Button
            className="px-40 w-98 rounded-8"
            variant="contained"
            autoFocus
            onClick={handleClose}
          >
            بستن
          </Button>
        ) : null}
        {dialogActionsChildren ? dialogActionsChildren : null}
      </DialogActions>
    </Dialog>
  );
};

export default WrapperDialog;
