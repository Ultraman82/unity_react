import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';

const customStyles = {
    iframe: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '80vh',
        zIndex: 255
    },
};
export default function LinkBoard(props) {
    const url = props.url
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            // maxHeight={"960px"}
            open={open}
            onClose={handleClose}
        // fullScreen={"true"}
        >
            <DialogContent>
                <iframe style={customStyles.iframe} src={url} > </iframe>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}