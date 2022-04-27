import React, { useState, useContext, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LinkContainer(props) {
  const unityContext = props.unityContext;
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("cheer");
  const test_string = "으로 이동하시겠습니까?"

  useEffect(function () {
    unityContext.on("OpenLink", function (linkType, name) {
      console.log("LinkContainer", linkType)
      setDestination(name);
      setOpen(true);
    });
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    unityContext.send('Manager', 'OpenReactLink', 'link1');
    console.log('handle_submit')
    setOpen(false)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${destination}으로 이동 하시겠습니까?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${destination}으로 이동 하시겠습니까?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}