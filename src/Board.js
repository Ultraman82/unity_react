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
const default_url = "https://padlet.com/exelcior99/i5bslrl8m525t97t";

export default function Board(props) {
    const unityContext = props.unityContext;

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(default_url);


    useEffect(function () {
        unityContext.on("OpenBoard", function (boardType, name) {
            console.log("Board", boardType)
            setOpen(true)
        });
    }, []);


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