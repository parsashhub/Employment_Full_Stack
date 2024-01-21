import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { SURE_TO_DELETE } from "../messages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, setOpen, handleDelete, title }) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="mx-12">
        {title ? title : SURE_TO_DELETE}
        {/*<Typography variant="subtitle1" color="error">*/}
        {/*  توجه: این عمل قابل بازگشت نیست*/}
        {/*</Typography>*/}
      </DialogTitle>
      <DialogActions className="justify-around mb-8">
        <Button
          className="rounded-8"
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          بله
        </Button>
        <Button
          className="rounded-8"
          variant="contained"
          onClick={handleClose}
          autoFocus
        >
          خیر
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
