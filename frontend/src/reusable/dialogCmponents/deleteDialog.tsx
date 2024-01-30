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
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, setOpen, handleDelete, title }: any) => {
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
        <Typography variant="body2" color="error">
          توجه: این عمل قابل بازگشت نیست
        </Typography>
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
